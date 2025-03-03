import { useMemo } from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { Window } from "@/components/ui/window";
import { useWindowManager } from "@/components/ui/window-manager";
import {
  useAccount,
  useReadContract,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from "wagmi";
import { env } from "@/config/env.mjs";
import { Address } from "viem";
import { humanBigint, formatDate } from "@/utils/strings";
import { FaLock } from "react-icons/fa";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket
} from "react-icons/fa6";

// Components
import WrongNetworkWindow from "../common/wrong-network";
import DiagonalRectangle from "../nft-sale-widget/common/diagonal-rectangle";
import { useConnectModal } from "@rainbow-me/rainbowkit";

// Contract ABI
import psyVestingAbi from "@/abis/psyVestingAbi.json";

const PSY_VESTING_ADDRESS = "0x2141B47A1C7De6df073d23ff94F04d9fd2aaA9b3";

type ScheduleProps = {
  startDate: string;
  cliffDate: string;
  endDate: string;
};

const Schedule = ({ startDate, cliffDate, endDate }: ScheduleProps) => {
  return (
    <>
      <Flex alignItems="center" gap={2}>
        <FaArrowRightFromBracket size={14} color="#9B33CB" />
        <Text>{startDate}</Text>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <FaLock size={14} color="#9B33CB" />
        <Text>{cliffDate}</Text>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <FaArrowRightToBracket size={14} color="#9B33CB" />
        <Text>{endDate}</Text>
      </Flex>
    </>
  );
};

type VestingScheduleProps = {
  scheduleIndex: number;
  chainId: number;
  contractAddress: Address;
};

const VestingSchedule = ({
  scheduleIndex,
  chainId,
  contractAddress
}: VestingScheduleProps) => {
  const { address } = useAccount();

  const { data: vestingScheduleId } = useReadContract({
    address: contractAddress,
    chainId,
    abi: psyVestingAbi,
    functionName: "computeVestingScheduleIdForAddressAndIndex",
    args: [address || "0x0", BigInt(scheduleIndex)],
    query: { enabled: !!address }
  });

  const { data: releasableAmount } = useReadContract({
    address: contractAddress,
    chainId,
    abi: psyVestingAbi,
    functionName: "computeReleasableAmount",
    args: [vestingScheduleId || "0x0"],
    query: { enabled: !!vestingScheduleId }
  });

  const { data: vestingSchedule } = useReadContract({
    address: contractAddress,
    chainId,
    abi: psyVestingAbi,
    functionName: "getVestingSchedule",
    args: [vestingScheduleId || "0x0"],
    query: { enabled: !!vestingScheduleId }
  });

  const { amountTotal, released, start, cliff, duration, status } =
    vestingSchedule || {};

  const amountTotalFormatted = humanBigint(amountTotal || 0n, 18, true, 2);
  //const releasedFormatted = humanBigint(released || 0n, 18, true, 2);
  const releasableAmountFormatted = humanBigint(
    typeof releasableAmount === "bigint" ? releasableAmount : 0n,
    18,
    true,
    2
  );

  const startDate = start ? formatDate(start) : "-";
  const cliffDate = cliff ? formatDate(cliff) : "-";
  const endDate = start && duration ? formatDate(start + duration) : "-";

  const { data: prepareRelease, isLoading: isLoadingPrepareRelease } =
    useSimulateContract({
      address: contractAddress,
      chainId,
      abi: psyVestingAbi,
      functionName: "release",
      args: [vestingScheduleId || "0x0", releasableAmount || 0n],
      query: { enabled: !!vestingScheduleId && !!releasableAmount }
    });

  const {
    writeContract,
    data: releaseHash,
    isPending: isLoadingWriteRelease
  } = useWriteContract();

  const { isLoading: isLoadingTransactionRelease } =
    useWaitForTransactionReceipt({
      hash: releaseHash,
      query: { enabled: !!releaseHash }
    });

  const isLoadingRelease =
    isLoadingPrepareRelease ||
    isLoadingWriteRelease ||
    isLoadingTransactionRelease;

  const onReleaseClick = () => {
    if (!writeContract || !prepareRelease) return;
    writeContract(prepareRelease.request);
  };

  if (status !== 1) {
    return null;
  }

  return (
    <Box as="tr">
      <Box as="td" p={2} borderBottom="1px solid" borderColor="gray.100">
        <Schedule
          startDate={startDate}
          cliffDate={cliffDate}
          endDate={endDate}
        />
      </Box>

      <Box
        as="td"
        p={2}
        borderBottom="1px solid"
        borderColor="gray.100"
        display={{ base: "none", md: "table-cell" }}
      >
        <span>{amountTotalFormatted} PSY</span>
      </Box>

      <Box
        as="td"
        p={2}
        borderBottom="1px solid"
        borderColor="gray.100"
        display={{ base: "none", md: "table-cell" }}
      >
        <span>{releasableAmountFormatted} PSY</span>
      </Box>

      <Box
        as="td"
        p={2}
        textAlign="right"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Button
          variant="unstyled"
          isLoading={isLoadingRelease}
          onClick={onReleaseClick}
        >
          Release
        </Button>
      </Box>
    </Box>
  );
};

// Window style configurations
const windowStyles = {
  height: "100%",
  maxHeight: {
    base: "85%",
    sm: "80%",
    md: "650px"
  },
  maxWidth: {
    base: "95%",
    md: "602px"
  },
  width: "100%",
  top: {
    base: "65%",
    sm: "58%",
    md: "50%"
  }
} as const;

export function Vesting() {
  const { state } = useWindowManager();
  const { address, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();

  const {
    data: vestingScheduleCount,
    isLoading: isLoadingVestingScheduleCount
  } = useReadContract({
    address: PSY_VESTING_ADDRESS,
    functionName: "holdersVestingScheduleCount",
    abi: psyVestingAbi,
    args: [address || "0x0"],
    query: { enabled: !!address }
  });

  // Memoized values
  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "vesting") {
      return true;
    }

    return false;
  }, [state]);
  const isWrongNetwork = chainId !== env.NEXT_PUBLIC_CHAIN_ID;

  return (
    <Window
      id="vesting"
      {...windowStyles}
      maxHeight={fullScreenWindow ? "100%" : windowStyles.maxHeight}
      maxWidth={fullScreenWindow ? "100%" : windowStyles.maxWidth}
      top={{
        base: fullScreenWindow ? "0" : "58%",
        sm: fullScreenWindow ? "0" : "56%",
        md: fullScreenWindow ? "0" : "52%"
      }}
      left={fullScreenWindow ? "0" : "50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -50%)"}
      fullScreenWindow={fullScreenWindow}
    >
      <Window.TitleBar />
      <Window.Content p={0} overflowX="hidden">
        {!address ? (
          <Flex
            direction={"column"}
            justifyContent="center"
            alignItems="center"
            height="100%"
            px={4}
          >
            <Box
              p={6}
              display={"inline-flex"}
              borderRadius={"30px"}
              border={"2px solid #F2BEBE73"}
              gap={2.5}
              position={"relative"}
              flexDirection={"column"}
              alignItems={"center"}
              height={"fit-content"}
              width={"fit-content"}
            >
              <Box>
                <Image src={"/psy-logo.svg"} />
              </Box>
              <Flex
                flexWrap={"nowrap"}
                gap={4}
                alignItems={"center"}
                direction={"column"}
                justifyContent={"center"}
              >
                <DiagonalRectangle position="left" />
                <Text
                  fontSize={18}
                  color={"black"}
                  lineHeight={"26px"}
                  textAlign={"center"}
                >
                  Connect your wallet <br /> to see vesting schedules
                </Text>
                <DiagonalRectangle position="right" />
                <Button
                  variant={"unstyled"}
                  w={"100%"}
                  borderRadius={"24px"}
                  border={"2px solid #F2BEBE"}
                  color={"#F2BEBE"}
                  fontSize={18}
                  fontFamily={"Amiri"}
                  fontWeight={"bold"}
                  onClick={() => {
                    openConnectModal && openConnectModal();
                  }}
                >
                  Connect Wallet
                </Button>
              </Flex>
            </Box>
          </Flex>
        ) : isWrongNetwork ? (
          <WrongNetworkWindow />
        ) : (
          <Flex
            direction={"column"}
            justifyContent="center"
            alignItems="center"
            height="100%"
            px={8}
          >
            {!address ? (
              <Text fontSize={18} color={"black"}>
                Connect your wallet to see your vesting schedules
              </Text>
            ) : isLoadingVestingScheduleCount ? (
              <Text fontSize={18} color={"black"}>
                Loading...
              </Text>
            ) : (
              <>
                {!vestingScheduleCount && (
                  <div className="col-span-full py-4">
                    No vesting schedules found. Try another wallet.
                  </div>
                )}
                <Box overflowX="auto" width="100%">
                  <Text fontSize="xl" fontWeight="bold" mb={4} as="h2">
                    Your PSY Vesting Schedules
                  </Text>
                  <Box as="table" width="100%">
                    <Box as="thead">
                      <Box as="tr">
                        <Box
                          as="th"
                          p={2}
                          textAlign="left"
                          borderBottom="1px solid"
                          borderColor="gray.200"
                        >
                          Schedule
                        </Box>

                        <Box
                          as="th"
                          p={2}
                          textAlign="left"
                          borderBottom="1px solid"
                          borderColor="gray.200"
                          display={{ base: "none", md: "table-cell" }}
                        >
                          Total Amount
                        </Box>

                        <Box
                          as="th"
                          p={2}
                          textAlign="left"
                          borderBottom="1px solid"
                          borderColor="gray.200"
                          display={{ base: "none", md: "table-cell" }}
                        >
                          Releasable
                        </Box>

                        <Box
                          as="th"
                          p={2}
                          textAlign="right"
                          borderBottom="1px solid"
                          borderColor="gray.200"
                        >
                          Actions
                        </Box>
                      </Box>
                    </Box>
                    <Box as="tbody">
                      {Array.from({
                        length: Number(vestingScheduleCount) || 0
                      }).map((_, index) => (
                        <VestingSchedule
                          scheduleIndex={index}
                          contractAddress={PSY_VESTING_ADDRESS}
                          chainId={chainId}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Flex>
        )}
        <Box
          as="img"
          src="/windows/alchemist/clouds.png"
          alt=""
          position="absolute"
          right="0"
          bottom="0"
          zIndex="-1"
          filter="blur(12px)"
        />
      </Window.Content>
    </Window>
  );
}
