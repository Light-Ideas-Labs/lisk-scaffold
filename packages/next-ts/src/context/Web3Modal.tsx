

import React, { ReactNode } from 'react';
import { wagmiLiskconfig, wagmiConfig, projectId } from '../blockchain/config';
import { WagmiContractsProvider } from "../blockchain/hooks/useContractsProvider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { State, WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

createWeb3Modal({
    wagmiConfig,
    projectId,
    themeMode: 'dark',
    themeVariables: {
      "--w3m-accent": "cyan",
      "--w3m-border-radius-master": "0px"
    }
  });  
  
  export function Web3Modal({ children, initialState }: { children: ReactNode; initialState?: State }) {
    return (
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <WagmiContractsProvider>
            {children}
          </WagmiContractsProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }