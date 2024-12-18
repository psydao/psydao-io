import { useReadContract } from "wagmi"
import { type Address } from "viem"
import ERC20ABI from "@/abis/ERC20.json"

export function useTokenInfo(tokenAddress: Address) {
  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'symbol'
  }) as { data: string }

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'decimals'
  }) as { data: number }

  // We can also get balance if needed since this ABI includes it
  const { data: totalSupply } = useReadContract({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: 'totalSupply'
  }) as { data: bigint }

  return {
    symbol,
    decimals,
    totalSupply
  }
}