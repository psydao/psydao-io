import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Input,
  Switch,
  Text,
  useToast
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { RiArrowLeftLine, RiTimeLine } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useState } from "react";
import { Zoom } from "react-toastify";
import { customToast } from "../toasts/SwapSuccess";
import { type AdminSale } from "@/lib/types";

export const CreateSale = ({
  setOpenCreateSale
}: {
  setOpenCreateSale: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { address } = useAccount();
  const toast = useToast();
  const [timeInputType, setTimeInputType] = useState("text");
  const [focused, setFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [width] = useState(window.innerWidth);
  const [privateSale, setPrivateSale] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [floorPrice, setFloorPrice] = useState("");
  const [ceilingPrice, setCeilingPrice] = useState("");
  const inputType = focused ? "date" : "text";

  const handleCreateSale = async (e: React.FormEvent<HTMLFormElement>) => {
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
    let mySales: AdminSale[] = [];
    const storedSales = localStorage.getItem("createdSales");
    if (storedSales) {
      try {
        mySales = JSON.parse(storedSales) as AdminSale[];
      } catch (error) {
        console.error("Failed to parse sales from localStorage:", error);
      }
    }

    const newSale: AdminSale = {
      privateSale: privateSale,
      startDate,
      startTime,
      floorPrice,
      ceilingPrice
    };
    localStorage.setItem("createdSales", JSON.stringify([...mySales, newSale]));
    customToast(
      {
        mainText: "Success! Your sale has been created.",
        isPsyc: true
      },
      {
        type: "success",
        transition: Zoom
      },
      width <= 768
    );
    setOpenCreateSale(false);
    setIsSubmitting(false);
  };

  return (
    <>
      <Box px={{ base: 2, md: 4 }} py={2}>
        <Flex
          alignItems={{ base: "start", md: "center" }}
          flexWrap={"wrap"}
          gap={12}
        >
          <Box
            onClick={() => setOpenCreateSale(false)}
            display="flex"
            alignItems="center"
            gap="1"
            cursor="pointer"
          >
            <Icon as={RiArrowLeftLine} color="#F2BEBE" />
          </Box>
          <Text
            textColor="#269200"
            fontWeight="500"
            fontStyle="italic"
            fontSize={{ base: "20px", sm: "40px" }}
            lineHeight={{ base: "20px", sm: "40px" }}
            fontFamily={"Amiri"}
          >
            Create Sale
          </Text>
        </Flex>
      </Box>
      <form onSubmit={handleCreateSale}>
        <Box position="relative" height="100%" mb={12} overflowY="auto">
          <Flex
            flexDirection="column"
            width="100%"
            p={6}
            gap={4}
            borderY="1px"
            borderColor="#F2BEBE"
          >
            <Text fontSize="18">NFT Tokens included in batch</Text>
            <Flex gap={2} flexWrap="wrap">
              <Box
                py={{ base: 2, md: 3 }}
                px={{ base: 2, md: 4 }}
                cursor={"pointer"}
                bg={"#F2BEBE1A"}
                borderRadius={"50px"}
                fontFamily={"Inter Medium"}
                fontSize={{ base: 12, md: 14 }}
                _hover={{ textDecoration: "none" }}
              >
                123456
              </Box>
              <Box
                py={{ base: 2, md: 3 }}
                px={{ base: 2, md: 4 }}
                cursor={"pointer"}
                bg={"#F2BEBE1A"}
                borderRadius={"50px"}
                fontFamily={"Inter Medium"}
                fontSize={{ base: 12, md: 14 }}
                _hover={{ textDecoration: "none" }}
              >
                123456
              </Box>
            </Flex>
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
            <Text fontSize="18">Sale start time</Text>
            <Flex gap={2} flexWrap="wrap">
              <Flex
                cursor={"pointer"}
                borderColor="#E6E6E6"
                alignItems="center"
                border="1px"
                borderRadius={"18px"}
                gap={1}
                fontFamily={"Inter Medium"}
                paddingX={2}
                fontSize={{ base: 12, md: 14 }}
                _hover={{ textDecoration: "none" }}
              >
                {inputType === "text" ? (
                  <Icon
                    as={FaRegCalendarCheck}
                    color="#F2BEBE"
                    fontSize={{ base: 24, md: 24 }}
                  />
                ) : null}

                <Input
                  placeholder="Date"
                  type={inputType}
                  id="date"
                  onFocus={() => setFocused(true)}
                  onChange={(e) => setStartDate(e.target.value)}
                  outline="0"
                  _focus={{ border: "none" }}
                  maxWidth="170px"
                  border="none"
                  required
                />
              </Flex>

              <Flex
                cursor={"pointer"}
                borderColor="#E6E6E6"
                alignItems="center"
                paddingX={2}
                border="1px"
                borderRadius={"18px"}
                gap={1}
                fontFamily={"Inter Medium"}
                fontSize={{ base: 12, md: 14 }}
                _hover={{ textDecoration: "none" }}
              >
                {timeInputType === "text" ? (
                  <Icon
                    as={RiTimeLine}
                    color="#F2BEBE"
                    fontSize={{ base: 24, md: 24 }}
                  />
                ) : null}

                <Input
                  type={timeInputType}
                  placeholder="Time"
                  id="time"
                  onFocus={() => setTimeInputType("time")}
                  outline="0"
                  _focus={{ border: "none" }}
                  onChange={(e) => setStartTime(e.target.value)}
                  maxWidth="170px"
                  border="none"
                  required
                />
              </Flex>
            </Flex>
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
            <FormLabel fontSize="18" htmlFor="private-sale" mb="0">
              Private sale
            </FormLabel>
            <Switch
              id="private-sale"
              onChange={() => setPrivateSale(!privateSale)}
              size="lg"
              colorScheme="purple"
            />
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
              Floor Price
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
                step={0.01}
                min={0.01}
                w={20}
                fontSize="22px"
                onChange={(e) => setFloorPrice(e.target.value)}
                required
              />
              <Text
                fontWeight="semibold"
                borderRadius={4}
                p="4px"
                bg="#F2BEBE1A"
              >
                ETH
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
              Ceiling Price
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
                step={0.01}
                min={0.01}
                w={20}
                onChange={(e) => setCeilingPrice(e.target.value)}
                required
                fontSize="22px"
              />
              <Text
                fontWeight="semibold"
                borderRadius={4}
                p="4px"
                bg="#F2BEBE1A"
              >
                ETH
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
              Create
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};
