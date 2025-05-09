// app/_components/NotFoundClient.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function NotFoundClient() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return <p>We couldn’t find the page{tab ? ` for tab "${tab}"` : ''}.</p>;
}
