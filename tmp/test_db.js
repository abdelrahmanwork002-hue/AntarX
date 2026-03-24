const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://postgres.evtqtqgatsovzhlurumh:n4nsyoQWxbOoxINn@aws-3-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require",
});

async function test() {
  try {
    await client.connect();
    console.log('Connected!');
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error', err.stack);
  }
}

test();
