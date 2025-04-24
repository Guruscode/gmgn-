import Trending from '@/components/trending';
import { Suspense } from 'react'
export default function Page() {
  return (
    <div className="">
      <Suspense>
        <Trending />
      </Suspense>
    </div>
  );
}
