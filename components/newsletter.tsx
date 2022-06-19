import { Button, Input, Text } from "@chakra-ui/react";

import { Item } from "components/item";

export const Newsletter = () => {
  return (
    <Item id="newsletter">
      <Item.Icon>
        <Text as="span" _hover={{ color: "#f00" }}>
          Newsletter
        </Text>
      </Item.Icon>
      <Item.Window>
        <Text as="h1">Stay in the loop</Text>
        <Text>Subscribe to our newsletter</Text>
        <Input placeholder="stan@psydao.io" />
        <Button>Subscribe</Button>
      </Item.Window>
    </Item>
  );
};
