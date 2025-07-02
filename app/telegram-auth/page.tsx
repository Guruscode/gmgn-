'use client';
import { useEffect, useState } from 'react';

export default function TelegramAuthPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fetch(`/api/telegram-auth?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
          setError(data.error || 'Unknown error');
        }
      })
      .catch(err => {
        setStatus('error');
        setError(err.message);
      });
  }, []);

  if (status === 'loading') return <div style={{padding:40, textAlign:'center'}}>Validating Telegram login...</div>;
  if (status === 'success') return <div style={{padding:40, textAlign:'center'}}>✅ Telegram login successful!</div>;
  return <div style={{padding:40, textAlign:'center'}}>❌ Telegram login failed: {error}</div>;
} 