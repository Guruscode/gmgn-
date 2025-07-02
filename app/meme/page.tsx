import Meme from '@/components/meme';
import { Metadata } from 'next';
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Pump Rank - NordicX.io Fast Trade, Fast Copy Trade, Fast AFK Automation.",
  description: "NordicX.io Fast Trade, Fast Copy Trade, Fast AFK Automation",
};

export default function Page() {
  return (
    <Suspense>
      <Meme />
    </Suspense>
  )
}