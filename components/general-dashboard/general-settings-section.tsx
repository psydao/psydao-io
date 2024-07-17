import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  useToast
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Zoom } from "react-toastify";
import { customToast } from "../toasts/SwapSuccess";
import { type GeneralSettings } from "@/lib/types";

export const GeneralSettingsSection = () => {
  const { address } = useAccount();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [width] = useState(window.innerWidth);
  const [revenue, setRevenue] = useState("");
  const [buyLimit, setBuyLimit] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [treasury, setTreasury] = useState("");
  const [nftOwners, setNftOwners] = useState("");

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) {
      toast({
        title: "Please connect your wallet first",
        position: "top-right",
        status: "error",
        isClosable: true
      });
      return;
    }
    setIsSubmitting(true);

    const updatedSettings: GeneralSettings = {
      revenue,
      buyLimit,
      treasury,
      royalties,
      nftOwners
    };
    localStorage.setItem("generalSettings", JSON.stringify(updatedSettings));
    customToast(
      {
        mainText: "Success! Your settings have been saved.",
        isPsyc: true
      },
      {
        type: "success",
        transition: Zoom
      },
      width <= 768
    );
    setIsSubmitting(false);
  };

  useEffect(() => {
    const storedSetting = localStorage.getItem("generalSettings");
    if (storedSetting) {
      try {
        const parsedSettings = JSON.parse(storedSetting) as GeneralSettings; // Explicitly cast the parsed result
        setRevenue(parsedSettings.revenue);
        setRoyalties(parsedSettings.royalties);
        setTreasury(parsedSettings.treasury);
        setBuyLimit(parsedSettings.buyLimit);
        setNftOwners(parsedSettings.nftOwners);
      } catch (error) {
        console.error("Failed to parse settings from localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSaveSettings}>
        <Box position="relative" height="100%" mb={12} overflowY="auto">
          <Flex
            width="100%"
            justifyContent="space-between"
            p={6}
            gap={4}
            borderY="1px"
            alignItems="center"
            borderColor="#F2BEBE"
          >
            <Text fontSize="18">Royalties revenue</Text>
            <Box
              display="flex"
              bg="#FBF6F8"
              alignItems="center"
              borderRadius="xl"
              boxShadow="inner"
              gap={1}
              p="16px"
            >
              <Text color={"#000000E5"} fontFamily={"Inter"} fontSize={"22px"}>
                12,000
              </Text>
              <Flex
                gap={2}
                position={"relative"}
                alignItems={"center"}
                // w={"100%"}
              >
                <Image
                  src="/windows/swap/ETH.svg"
                  alt={`ETH icon`}
                  height={16}
                  width={16}
                />
                <Button
                  color={"#9835BA"}
                  fontFamily={"Inter"}
                  fontSize={{ base: 16, sm: 18 }}
                >
                  Withdraw
                </Button>
              </Flex>
            </Box>
          </Flex>
          <Flex
            width="100%"
            justifyContent="space-between"
            p={6}
            gap={4}
            borderY="1px"
            alignItems="center"
            borderColor="#F2BEBE"
          >
            <FormLabel fontSize="18" htmlFor="buyLimit" mb="0">
              Buy limit per Address
            </FormLabel>
            <Box
              display="flex"
              bg="#FBF6F8"
              alignItems="center"
              borderRadius="xl"
              boxShadow="inner"
              gap={4}
              p="16px"
            >
              <Input
                type="number"
                step={1}
                min={1}
                w={28}
                value={buyLimit}
                onChange={(e) => setBuyLimit(e.target.value)}
                required
                fontSize="22px"
              />
            </Box>
          </Flex>
          <Box
            width="100%"
            p={6}
            borderY="1px"
            fontWeight="bold"
            borderColor="#F2BEBE"
          >
            Revenue splits
          </Box>
          <Flex
            width="100%"
            justifyContent="space-between"
            p={6}
            gap={4}
            borderY="1px"
            alignItems="center"
            borderColor="#F2BEBE"
          >
            <FormLabel fontSize="18" htmlFor="floor price" mb="0">
              Royalties
            </FormLabel>
            <Box
              display="flex"
              bg="#FBF6F8"
              alignItems="center"
              borderRadius="xl"
              boxShadow="inner"
              gap={4}
              p="16px"
            >
              <Input
                type="number"
                step={1}
                min={1}
                w={16}
                value={royalties}
                onChange={(e) => setRoyalties(e.target.value)}
                required
                fontSize="22px"
              />
              <Text bg={"#F2BEBE1A"} p={4} rounded={"18px"} fontSize={"xl"}>
                %
              </Text>
            </Box>
          </Flex>
          <Flex
            width="100%"
            justifyContent="space-between"
            p={6}
            gap={4}
            borderY="1px"
            alignItems="center"
            borderColor="#F2BEBE"
          >
            <FormLabel fontSize="18" htmlFor="floor price" mb="0">
              Treasury
            </FormLabel>
            <Box
              display="flex"
              bg="#FBF6F8"
              alignItems="center"
              borderRadius="xl"
              boxShadow="inner"
              gap={4}
              p="16px"
            >
              <Input
                type="number"
                step={1}
                min={1}
                w={16}
                value={treasury}
                onChange={(e) => setTreasury(e.target.value)}
                required
                fontSize="22px"
              />
              <Text bg={"#F2BEBE1A"} p={4} rounded={"18px"} fontSize={"xl"}>
                %
              </Text>
            </Box>
          </Flex>
          <Flex
            width="100%"
            justifyContent="space-between"
            p={6}
            gap={4}
            borderY="1px"
            alignItems="center"
            borderColor="#F2BEBE"
          >
            <FormLabel fontSize="18" htmlFor="floor price" mb="0">
              NFT owners
            </FormLabel>
            <Box
              display="flex"
              bg="#FBF6F8"
              alignItems="center"
              borderRadius="xl"
              boxShadow="inner"
              gap={4}
              p="16px"
            >
              <Input
                type="number"
                step={1}
                min={1}
                w={16}
                value={nftOwners}
                onChange={(e) => setNftOwners(e.target.value)}
                required
                fontSize="22px"
              />
              <Text bg={"#F2BEBE1A"} p={4} rounded={"18px"} fontSize={"xl"}>
                %
              </Text>
            </Box>
          </Flex>
          <Box
            width="95%"
            position="fixed"
            bottom={0}
            bg="white"
            mx="auto"
            px={10}
            py={2}
          >
            <Button
              type="submit"
              variant={"unstyled"}
              bg={
                !address
                  ? "gray.500"
                  : "linear-gradient(90deg, #B14CE7 0%, #E09CA4 100%)"
              }
              color={!address ? "black" : "white"}
              borderRadius={"full"}
              paddingX={12}
              paddingY={3}
              height="36px"
              display={"flex"}
              alignItems="center"
              justifyContent="center"
              isDisabled={isSubmitting ?? !address}
              _hover={{
                opacity: !address ? "" : "0.8"
              }}
              fontFamily={"Amiri"}
              fontSize={16}
              fontWeight={600}
              width="100%"
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};
