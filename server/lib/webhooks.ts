import { serverSupabase, isServerSupabaseConfigured } from "./supabase";

export async function savePhonePeWebhook(event: {
  txn: string | null;
  headers: any;
  body: any;
}) {
  if (!isServerSupabaseConfigured()) return;
  try {
    await serverSupabase.from("phonepe_webhooks").insert([
      {
        merchant_transaction_id: event.txn || null,
        headers: event.headers || {},
        body: event.body || {},
        received_at: new Date().toISOString(),
      },
    ]);
  } catch (e) {
    // ignore failures
  }
}

export async function findWebhookByTxn(txn: string) {
  if (!isServerSupabaseConfigured()) return null;
  try {
    const { data } = await serverSupabase
      .from("phonepe_webhooks")
      .select("id, merchant_transaction_id, headers, body, received_at")
      .eq("merchant_transaction_id", txn)
      .order("received_at", { ascending: false })
      .limit(1);
    if (!data || data.length === 0) return null;
    return data[0];
  } catch (e) {
    return null;
  }
}
