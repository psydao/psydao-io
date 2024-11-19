import { type GetTokensByOwnerData } from "@/lib/types";
import { getTokensByOwner } from "@/services/graph";
import { useQuery } from "@apollo/client";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
  useEffect
} from "react";
import { useAccount } from "wagmi";

interface TokenContextType {
  data: GetTokensByOwnerData | undefined;
  loading: boolean;
  error: Error | undefined;
  tokenCount: number;
  refetch: () => void;
  setTokenCount: (count: number) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [tokenCount, setTokenCount] = useState(0);
  const { address } = useAccount();

  const {
    data,
    loading,
    error,
    refetch: refetchQuery
  } = useQuery<GetTokensByOwnerData>(getTokensByOwner, {
    variables: {
      owner: address
    },
    onCompleted: (data) => {
      setTokenCount(data?.tokens.length ?? 0);
    },
    skip: !address
  });

  useEffect(() => {
    if (address && data) {
      setTokenCount(data?.tokens.length ?? 0);
    }
  }, [address, data, setTokenCount]);

  const refetch = useCallback((): void => {
    void refetchQuery();
  }, [refetchQuery]);

  return (
    <TokenContext.Provider
      value={{ tokenCount, setTokenCount, data, loading, error, refetch }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
};
