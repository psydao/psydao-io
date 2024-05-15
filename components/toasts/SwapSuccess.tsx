import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import {
  type Id,
  toast,
  type ToastOptions,
  type TypeOptions
} from "react-toastify";
import CheckIcon from "public/icons/check.svg";

interface BodyProps {
  mainText: string;
  type?: TypeOptions | null | undefined;
}

const CustomCloseButton = (props: {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Button
      variant={"unstyled"}
      color={"#F2BEBE"}
      onClick={props.closeToast}
      display={"grid"}
      placeItems={"center"}
      h={"auto"}
    >
      <CloseIcon w={"10px"} h={"10px"} />
    </Button>
  );
};

const getIcon = (type: TypeOptions | null | undefined) => {
  if (type === "success") {
    return <CheckIcon w={{ base: "12px", md: "20px" }} />;
  }
  if (type === "error") {
    return <WarningIcon color="red" w={{ base: "12px", md: "20px" }} />;
  }
};

const ToastBody = (props: BodyProps) => {
  return (
    <>
      <Flex
        flexDirection="row"
        alignItems={"center"}
        gap={4}
        p={{ base: 2, sm: 4 }}
        border={"2px #F2BEBE"}
        h={"full"}
        w={{ base: "100%", md: "481px" }}
        maxW={"481px"}
      >
        <Flex gap="9px" alignItems="center">
          {getIcon(props.type)}
          <Text
            color={"#9835BA"}
            fontSize={{ base: "12px", md: "24px" }}
            fontStyle={"italic"}
            fontFamily={"Amiri"}
            mt={"2px"}
            maxW={{ base: props.type === "error" ? "100%" : "80%", md: "90%" }}
            whiteSpace={{
              base: "normal",
              md: props.type === "error" ? "nowrap" : "normal"
            }}
          >
            {props.mainText}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export function customToast(
  content: BodyProps,
  options?: ToastOptions,
  isMobile?: boolean
): Id {
  return toast(<ToastBody {...content} type={options?.type} />, {
    icon: options?.type && false,
    style: {
      background: "linear-gradient(#FFFFFF, #F3FFE9, #E7FEFF)",
      width: "fit-content",
      transform: isMobile ? "" : "translateX(-20%)"
    },
    closeButton: CustomCloseButton,
    position: "top-center",
    autoClose: 3000,
    ...options
  });
}
