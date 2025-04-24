import NewPage from '@/components/reusable/newPair';
import { Metadata } from 'next';
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "New pair - GMGN.AI Fast Trade, Fast Copy Trade, Fast AFK Automation.",
  description: "GMGN.AI Fast Trade, Fast Copy Trade, Fast AFK Automation",
};

export default function Page() {
  return (
    <Suspense>
      <NewPage />
    </Suspense>
  )
}
