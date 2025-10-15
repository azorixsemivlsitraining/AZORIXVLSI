#!/usr/bin/env node
// Run SQL migrations against Postgres using SUPABASE_DB_URL env var
// Usage: SUPABASE_DB_URL="postgres://..." node server/scripts/run-migrations.js

const fs = require('fs');
const path = require('path');

async function main(){
  const dbUrl = process.env.SUPABASE_DB_URL;
  if(!dbUrl){
    console.error('SUPABASE_DB_URL not set. Provide Postgres connection string in SUPABASE_DB_URL env var.');
    process.exit(2);
  }
  let { Client } = require('pg');
  const client = new Client({ connectionString: dbUrl });
  try{
    await client.connect();
    const migrationsDir = path.join(process.cwd(),'server','migrations');
    const files = fs.readdirSync(migrationsDir).filter(f=>f.endsWith('.sql')).sort();
    for(const file of files){
      const sql = fs.readFileSync(path.join(migrationsDir,file),'utf8');
      console.log('Running',file);
      await client.query(sql);
      console.log('Applied',file);
    }
    console.log('Migrations complete');
  }catch(err){
    console.error('Migration failed',err);
    process.exit(1);
  }finally{
    try{await client.end()}catch(e){}
  }
}

main();
