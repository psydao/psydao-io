import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
export default function useWalletConnect() {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const connectWallet = async () => {
    if (!isConnected) {
      if (connectors[0]) {
        connect({ connector: connectors[0] });
      }
    }
  };

  return { connectWallet, isConnected, isMounted, address, disconnect };
}
