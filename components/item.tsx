import { Box, useDisclosure } from "@chakra-ui/react";
import type { BoxProps, UseDisclosureReturn } from "@chakra-ui/react";

import { Window } from "components/window";
import { useWindowManager } from "components/window-manager";
import { createCtx } from "lib/context";

interface ItemContext extends UseDisclosureReturn {
  id: string;
}

export const [useItemContext, ItemContextProvider] = createCtx<ItemContext>();

const Icon = (props: BoxProps) => {
  const { id, onOpen } = useItemContext();
  const { focus } = useWindowManager();
  return (
    <Box
      onClick={() => {
        focus(id);
        onOpen();
      }}
      cursor="pointer"
      {...props}
    />
  );
};

interface ItemProps {
  children: React.ReactNode;
  defaultIsOpen?: boolean;
  id: string;
}

export const Item = ({ children, defaultIsOpen = false, id }: ItemProps) => {
  const disclosure = useDisclosure({ defaultIsOpen });

  return (
    <ItemContextProvider value={{ id, ...disclosure }}>
      {children}
    </ItemContextProvider>
  );
};

Item.Icon = Icon;
Item.Window = Window;
