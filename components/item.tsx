import { Box, useDisclosure } from "@chakra-ui/react";
import type { BoxProps, UseDisclosureReturn } from "@chakra-ui/react";
import * as React from "react";

import { useDesktopContext } from "components/desktop";
import { Window } from "components/window";

interface ItemContextProps extends UseDisclosureReturn {
  id: string;
}
const ItemContext = React.createContext<Partial<ItemContextProps>>({});
export const useItemContext = () => React.useContext(ItemContext);

export const Icon = (props: BoxProps) => {
  const { id, onOpen } = useItemContext();
  const { focus } = useDesktopContext();
  return (
    <Box
      onClick={() => {
        focus && id && focus(id);
        onOpen && onOpen();
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
    <ItemContext.Provider value={{ id, ...disclosure }}>
      {children}
    </ItemContext.Provider>
  );
};

Item.Icon = Icon;
Item.Window = Window;
