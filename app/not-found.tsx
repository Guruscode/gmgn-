// app/not-found.tsx
import { Suspense } from 'react';
import NotFoundClient from '@/components/NotFoundClient';

export default function NotFoundPage() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <Suspense fallback={null}>
        <NotFoundClient />
      </Suspense>
    </div>
  );
}
