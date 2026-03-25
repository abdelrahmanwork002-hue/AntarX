const { Client } = require('pg');

async function test(host) {
  const url = `postgres://postgres.evtqtqgatsovzhlurumh:n4nsyoQWxbOoxINn@${host}:6543/postgres?sslmode=require&pgbouncer=true`;
  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  });
  try {
    console.log(`Testing ${host}:6543...`);
    await client.connect();
    console.log(`✅ ${host}:6543 worked with credentials!`);
    await client.end();
    return true;
  } catch (err) {
    console.log(`❌ ${host}:6543 failed: ${err.message}`);
  }
  return false;
}

async function run() {
  const hosts = [
    'aws-0-us-east-1.pooler.supabase.com',
    'aws-1-us-east-1.pooler.supabase.com',
    'aws-0-us-west-1.pooler.supabase.com',
    'aws-0-eu-central-1.pooler.supabase.com',
  ];
  for (const h of hosts) {
    if (await test(h)) break;
  }
}

run();
