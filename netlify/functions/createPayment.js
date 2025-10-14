import crypto from "crypto";
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { amount = 99, email = "test@example.com" } = JSON.parse(event.body);

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    const baseUrl = process.env.PHONEPE_BASE_URL;
    const appBaseUrl = process.env.APP_BASE_URL;

    // Transaction details
    const merchantTransactionId = `TXN${Date.now()}`;

    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId: "USER123",
      amount: amount * 100, // amount in paise
      redirectUrl: `${appBaseUrl}/payment-success?txnId=${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: `${appBaseUrl}/payment-callback`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const xVerify =
      crypto
        .createHash("sha256")
        .update(payloadBase64 + "/pg/v1/pay" + saltKey)
        .digest("hex") +
      "###" +
      saltIndex;

    const response = await fetch(`${baseUrl}/v1/pay`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      body: JSON.stringify({
        request: payloadBase64,
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        redirectUrl: data.data.instrumentResponse.redirectInfo.url,
      }),
    };
  } catch (error) {
    console.error("Payment create error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
}
