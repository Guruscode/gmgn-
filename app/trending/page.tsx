"use client";
import Trending from '@/components/trending';
import { Suspense } from 'react'
export default function Page() {
  return (
    <div className="">
   <Suspense fallback={<div>Loading trending data...</div>}>
        <Trending />
      </Suspense>
    </div>
  );
}
