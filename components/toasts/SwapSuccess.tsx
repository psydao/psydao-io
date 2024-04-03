import { CloseIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import {
  Id,
  toast,
  ToastContentProps,
  ToastOptions,
  TypeOptions,
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
    return <CheckIcon width={20} />;
  }
  if (type === "error") {
    return <WarningIcon color="red" width={20} />;
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
        w={"481px"}
        maxW={"481px"}
      >
        <Flex gap="9px" alignItems="center">
          {getIcon(props.type)}
          <Text
            color={"#9835BA"}
            fontSize="24px"
            fontStyle={"italic"}
            fontFamily={"Amiri"}
            whiteSpace={"nowrap"}
          >
            {props.mainText}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export function customToast(content: BodyProps, options?: ToastOptions): Id {
  return toast(<ToastBody {...content} type={options?.type} />, {
    icon: options?.type && false,
    style: {
      background: "linear-gradient(#FFFFFF, #F3FFE9, #E7FEFF)",
      width: "fit-content",
      transform: "translateX(-20%)",
    },
    closeButton: CustomCloseButton,
    position: "top-center",
    autoClose: false,
    ...options,
  });
}
