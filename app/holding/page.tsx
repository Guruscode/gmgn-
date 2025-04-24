import Holding from '@/components/holding';
import { Metadata } from 'next';
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Holding - GMGN.AI Fast Trade, Fast Copy Trade, Fast AFK Automation.",
  description: "GMGN.AI Fast Trade, Fast Copy Trade, Fast AFK Automation",
};

export default function Page() {
  return (
    <Suspense>
      <Holding />
    </Suspense>
  )
}