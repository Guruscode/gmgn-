import Trending from '@/components/trending';
import { Suspense } from 'react'
export default function Home() {
  return (
    <div className="">
      <Suspense>
        <Trending />
      </Suspense>
    </div>
  );
}
