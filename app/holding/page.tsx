"use client";
import Holding from '@/components/holding';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading trending data...</div>}>
      <Holding />
    </Suspense>
  );
}