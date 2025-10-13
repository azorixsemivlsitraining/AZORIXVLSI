import crypto from "node:crypto";

const BASE_URL = process.env.PHONEPE_BASE_URL || "https://api-preprod.phonepe.com/apis/pg-sandbox";
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || "";
const SALT_KEY = process.env.PHONEPE_SALT_KEY || "";
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || "1";

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function buildXVerifyForPay(base64Payload: string) {
  const path = "/pg/v1/pay";
  const toSign = base64Payload + path + SALT_KEY;
  const hash = sha256Hex(toSign);
  return `${hash}###${SALT_INDEX}`;
}

function buildXVerifyForStatus(merchantTransactionId: string) {
  const path = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
  const toSign = path + SALT_KEY;
  const hash = sha256Hex(toSign);
  return { header: `${hash}###${SALT_INDEX}`, path };
}

export interface InitiatePaymentParams {
  merchantTransactionId: string;
  amountInPaise: number;
  name: string;
  email: string;
  mobile?: string;
  redirectUrl: string; // Full URL where PhonePe should redirect after payment
}

export async function initiatePayment(params: InitiatePaymentParams) {
  if (!MERCHANT_ID || !SALT_KEY) {
    throw new Error("PhonePe credentials not configured");
  }

  const payload = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: params.merchantTransactionId,
    merchantUserId: params.email || params.name,
    amount: params.amountInPaise,
    redirectUrl: params.redirectUrl,
    redirectMode: "GET",
    callbackUrl: params.redirectUrl,
    mobileNumber: params.mobile,
    paymentInstrument: { type: "PAY_PAGE" },
  } as const;

  const json = JSON.stringify(payload);
  const base64Payload = Buffer.from(json).toString("base64");
  const xverify = buildXVerifyForPay(base64Payload);

  const res = await fetch(`${BASE_URL}/pg/v1/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": xverify,
      accept: "application/json",
    },
    body: JSON.stringify({ request: base64Payload }),
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch (e) {
    console.error("PhonePe: failed to parse JSON response", e);
  }

  if (!res.ok || !data) {
    console.error("PhonePe init failed", { status: res.status, statusText: res.statusText, body: data });
    throw new Error(data?.message || "PhonePe init failed");
  }

  const url = data?.data?.instrumentResponse?.redirectInfo?.url as
    | string
    | undefined;
  if (!url) {
    throw new Error("PhonePe did not return redirect URL");
  }
  return { redirectUrl: url };
}

export async function fetchPaymentStatus(merchantTransactionId: string) {
  if (!MERCHANT_ID || !SALT_KEY) {
    throw new Error("PhonePe credentials not configured");
  }
  const { header, path } = buildXVerifyForStatus(merchantTransactionId);
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-VERIFY": header,
      "X-MERCHANT-ID": MERCHANT_ID,
    },
  });
  const data = await res.json().catch(() => ({}));
  return data;
}
