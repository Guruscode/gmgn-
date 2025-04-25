
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia,metachain } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Nordic.AI',
  projectId: '580421de9bd9bc42f547904b813cc3fc', // Get from walletconnect cloud
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, metachain],
  ssr: true,
});
