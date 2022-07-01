import { useEffect, useState } from "react";

interface CsrProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Csr = ({ children, fallback = null }: CsrProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (isClient) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
