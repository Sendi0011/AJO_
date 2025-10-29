"use client"

import { createAppKit } from "@reown/appkit/react"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { ReactNode } from "react"
import { defineChain } from "viem"

// 1. Get projectId from https://cloud.reown.com
const projectId = "3b6a40e24f6067b673d508713650f6a6"

// 2. Create metadata object
const metadata = {
  name: "BaseSafe",
  description: "Decentralized Community Savings Platform on Hedera",
  url: typeof window !== "undefined" ? window.location.origin : "https://basesafe.app",
  icons: ["https://basesafe.app/icon.png"],
}

// 3. Define Hedera Testnet
const hederaTestnet = defineChain({
  id: 296,
  name: "Hedera Testnet",
  nativeCurrency: {
    name: "HBAR",
    symbol: "HBAR",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.hashio.io/api"],
    },
    public: {
      http: ["https://testnet.hashio.io/api"],
    },
  },
  blockExplorers: {
    default: {
      name: "HashScan",
      url: "https://hashscan.io/testnet",
      apiUrl: "https://testnet.hashscan.io/api",
    },
  },
  testnet: true,
})

// 4. Define Hedera Mainnet (for future use)
const hederaMainnet = defineChain({
  id: 295,
  name: "Hedera Mainnet",
  nativeCurrency: {
    name: "HBAR",
    symbol: "HBAR",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.hashio.io/api"],
    },
    public: {
      http: ["https://mainnet.hashio.io/api"],
    },
  },
  blockExplorers: {
    default: {
      name: "HashScan",
      url: "https://hashscan.io/mainnet",
      apiUrl: "https://mainnet.hashscan.io/api",
    },
  },
  testnet: false,
})

// 5. Set the networks
const networks = [hederaTestnet, hederaMainnet]

// 6. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
})

// 7. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "oklch(0.65 0.20 165)",
    "--w3m-border-radius-master": "12px",
  },
})

// 8. Setup queryClient
const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}