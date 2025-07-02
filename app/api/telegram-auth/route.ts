import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Replace with your bot token
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';

function checkTelegramAuth(query: Record<string, string | string[]>) {
  // Extract Telegram login fields
  const data: Record<string, string> = {};
  const fields = [
    'id', 'first_name', 'last_name', 'username', 'photo_url', 'auth_date', 'hash'
  ];
  for (const field of fields) {
    if (query[field]) data[field] = Array.isArray(query[field]) ? query[field][0] : query[field];
  }
  const { hash, ...authData } = data;
  // Sort and create data_check_string
  const dataCheckArr = Object.keys(authData)
    .sort()
    .map(key => `${key}=${authData[key]}`);
  const dataCheckString = dataCheckArr.join('\n');
  // Create secret key
  const secret = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
  // Create HMAC
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');
  // Compare
  return hmac === hash;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  const isValid = checkTelegramAuth(query);
  if (!isValid) {
    return NextResponse.json({ success: false, error: 'Invalid Telegram login payload' }, { status: 401 });
  }
  // You can add user creation/session logic here later
  return NextResponse.json({ success: true, user: query });
} 