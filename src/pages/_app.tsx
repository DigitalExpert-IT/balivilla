import { getActiveChain } from "@/lib/chain";
import theme from "@/theme";
import "@/locales";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  safeWallet,
  localWallet,
  walletConnect,
  trustWallet,
} from "@thirdweb-dev/react";

const targetChain = getActiveChain();
const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB || "0";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedChains={[targetChain]}
      supportedWallets={[
        metamaskWallet(),
        trustWallet(),
        walletConnect(),
        coinbaseWallet(),
        safeWallet(),
        localWallet(),
      ]}
      activeChain={targetChain}
      clientId={CLIENT_ID}
    >
      <ChakraProvider
      // theme={theme}
      >
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}
