import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🔍 Checking Supabase configuration...");
console.log("URL:", supabaseUrl);
console.log("Key set:", !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("\n📡 Attempting to connect to Supabase...");
  
  try {
    const start = Date.now();
    const { data, error } = await supabase.from("contacts").select("count").limit(1);
    const duration = Date.now() - start;

    if (error) {
      console.error("\n❌ Supabase returned an error:");
      console.error(JSON.stringify(error, null, 2));
      
      if (error.message?.includes("fetch failed") || error.message?.includes("Failed to fetch")) {
        console.log("\n💡 ANALYSIS: This is a network error. The hostname cannot be resolved or reached.");
        console.log("Check if your Project ID 'zszamstjlzjfkwslzjfx' is correct and the project is not paused.");
      }
    } else {
      console.log(`\n✅ Success! Connected in ${duration}ms`);
      console.log("Table 'contacts' is accessible.");
    }
  } catch (err: any) {
    console.error("\n💥 Unexpected exception occurred:");
    console.error(err.message || err);
    
    if (err.message?.includes("ENOTFOUND") || err.message?.includes("EAI_AGAIN")) {
      console.log("\n💡 ANALYSIS: DNS Resolution failed. The subdomain 'zszamstjlzjfkwslzjfx' does not exist.");
    }
  }
}

testConnection();
