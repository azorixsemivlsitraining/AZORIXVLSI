import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// Base URLs
const BASE_URL =
  process.env.PHONEPE_BASE_URL ||
  "https://api-preprod.phonepe.com/apis/pg-sandbox"; // Used for checkout + status

// V1 (legacy) credentials
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || "";
const SALT_KEY = process.env.PHONEPE_SALT_KEY || "";
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || "1";

// V2 (OAuth) credentials
const CLIENT_ID = process.env.PHONEPE_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || "";
const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || "";

// Token URL rules: Sandbox uses pg-sandbox; Prod uses identity-manager
const TOKEN_URL =
  process.env.PHONEPE_TOKEN_URL ||
  (BASE_URL.includes("pg-sandbox")
    ? `${BASE_URL}/v1/oauth/token`
    : "https://api.phonepe.com/apis/identity-manager/v1/oauth/token");

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// Helper to fetch with an abort timeout (prevents server-side hanging on slow external APIs)
const DEFAULT_PHONEPE_FETCH_TIMEOUT = parseInt(
  process.env.PHONEPE_FETCH_TIMEOUT_MS || "5000",
  10,
);
async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeout = DEFAULT_PHONEPE_FETCH_TIMEOUT,
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const merged = { ...init, signal: controller.signal } as RequestInit;
    const res = await fetch(input, merged);
    return res;
  } finally {
    clearTimeout(id);
  }
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
  merchantTransactionId: string; // used as merchantOrderId in V2
  amountInPaise: number;
  name: string;
  email: string;
  mobile?: string;
  redirectUrl: string; // Full URL where PhonePe should redirect after payment
}

// -------------------- V2 OAuth helpers --------------------
let cachedToken: {
  accessToken: string;
  tokenType: string;
  expiresAt: number;
} | null = null;

async function getAccessTokenV2(): Promise<{ token: string; type: string }> {
  const now = Date.now();
  if (cachedToken && now < cachedToken.expiresAt - 60_000) {
    return { token: cachedToken.accessToken, type: cachedToken.tokenType };
  }
  const form = new URLSearchParams();
  form.set("client_id", CLIENT_ID);
  form.set("client_version", CLIENT_VERSION);
  form.set("client_secret", CLIENT_SECRET);
  form.set("grant_type", "client_credentials");

  // Use fetchWithTimeout to avoid long hangs
  const res = await fetchWithTimeout(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Token request failed: ${res.status} ${res.statusText} ${text}`,
    );
  }
  const data = (await res.json()) as any;
  const accessToken = data?.access_token as string;
  const tokenType = (data?.token_type as string) || "O-Bearer";
  const expiresAt =
    (data?.expires_at as number) || Math.floor(Date.now() / 1000) + 5 * 60;
  if (!accessToken) throw new Error("No access_token in token response");
  cachedToken = {
    accessToken,
    tokenType,
    expiresAt:
      typeof expiresAt === "number" && expiresAt > 1_000_000_000
        ? expiresAt * 1000
        : now + 5 * 60 * 1000,
  };
  return { token: accessToken, type: tokenType };
}

function isV2Configured() {
  return Boolean(CLIENT_ID && CLIENT_SECRET && CLIENT_VERSION);
}

// -------------------- Public API --------------------
export async function initiatePayment(params: InitiatePaymentParams) {
  if (isV2Configured()) {
    // V2 flow: Create Payment (checkout v2)
    const { token, type } = await getAccessTokenV2();

    const payload = {
      merchantOrderId: params.merchantTransactionId,
      amount: params.amountInPaise,
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: { redirectUrl: params.redirectUrl },
      },
    } as const;

    const out = {
      url: `${BASE_URL}/checkout/v2/pay`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      },
      decodedPayload: JSON.stringify(payload),
    };
    try {
      const logsDir = path.join(process.cwd(), "server", "logs");
      if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
      fs.writeFileSync(
        path.join(logsDir, "phonepe_last_request.json"),
        JSON.stringify(out, null, 2),
        "utf8",
      );
    } catch {}

    const res = await fetchWithTimeout(`${BASE_URL}/checkout/v2/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !(data as any)?.redirectUrl) {
      throw new Error((data as any)?.message || "PhonePe V2 init failed");
    }
    return { redirectUrl: (data as any).redirectUrl as string };
  }

  // V1 fallback (legacy) if V2 is not configured
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

  const out = {
    url: `${BASE_URL}/pg/v1/pay`,
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": xverify,
      accept: "application/json",
    },
    base64Payload,
    decodedPayload: json,
  };
  try {
    const logsDir = path.join(process.cwd(), "server", "logs");
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
    fs.writeFileSync(
      path.join(logsDir, "phonepe_last_request.json"),
      JSON.stringify(out, null, 2),
      "utf8",
    );
  } catch {}

  const res = await fetchWithTimeout(`${BASE_URL}/pg/v1/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": xverify,
      accept: "application/json",
    },
    body: JSON.stringify({ request: base64Payload }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as any)?.message || "PhonePe init failed");
  }
  const url = (data as any)?.data?.instrumentResponse?.redirectInfo?.url as
    | string
    | undefined;
  if (!url) throw new Error("PhonePe did not return redirect URL");
  return { redirectUrl: url };
}

export async function fetchPaymentStatus(merchantTransactionId: string) {
  if (isV2Configured()) {
    const { token, type } = await getAccessTokenV2();
    const url = `${BASE_URL}/checkout/v2/order/${encodeURIComponent(merchantTransactionId)}/status?details=false`;
    const res = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
        ...(MERCHANT_ID ? { "X-MERCHANT-ID": MERCHANT_ID } : {}),
      },
    });
    const data = await res.json().catch(() => ({}));
    return { data };
  }

  if (!MERCHANT_ID || !SALT_KEY) {
    throw new Error("PhonePe credentials not configured");
  }
  const { header, path } = buildXVerifyForStatus(merchantTransactionId);
  const res = await fetchWithTimeout(`${BASE_URL}${path}`, {
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
