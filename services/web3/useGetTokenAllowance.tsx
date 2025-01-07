import { Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi"

interface UseGetTokenAllowanceProps {
  spenderAddress: Address
  tokenAddress: Address
}

const useGetTokenAllowance = ({ spenderAddress, tokenAddress }: UseGetTokenAllowanceProps) => {
  const { address } = useAccount()
  const owner = address ?? "0x"

  const { data, isSuccess, refetch, error, isLoading, isFetching } =
    useReadContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "allowance",
      args: [owner, spenderAddress]
    });

  return {
    allowance: data as bigint,
    loading: isLoading || isFetching,
    isSuccess,
    refetch,
    error
  };
}

export default useGetTokenAllowance