import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import { Item } from "components/item";

export const Newsletter = () => {
  return (
    <Item id="newsletter">
      <Item.Icon
        px="8"
        border="2px solid #f2bebe"
        borderRadius="full"
        boxShadow="4px 4px 13px 0px #F2BEBEA1"
        background="#fffafa"
        color="#f2bebe"
        fontSize="24px"
        fontStyle="italic"
        fontWeight="700"
        textAlign="center"
        transition="all 200ms ease"
        _hover={{
          color: "#9835BA",
          border: "2px solid #9835BA",
        }}
      >
        <Text as="span">News</Text>
      </Item.Icon>
      <Item.Window
        layerStyle="window"
        height={{ base: "380px", md: "410px" }}
        width="90%"
        maxWidth="300px"
        top="5%"
        right="10%"
        resizable={false}
      >
        <Text
          color="#269200"
          fontSize="24px"
          mt="3"
          as="span"
          display="inline-block"
        >
          Stay in the loop
        </Text>
        <Text>Subscribe to our newsletter</Text>
        <Flex
          as="form"
          action="https://www.getrevue.co/profile/psydao/add_subscriber"
          method="post"
          name="revue-form"
          target="_blank"
          direction="column"
          gap="3"
          my="3"
        >
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              placeholder="Your email address..."
              type="email"
              name="member[email]"
              id="email"
              borderRadius="0px"
            />
          </FormControl>
          <Button
            type="submit"
            value="Subscribe"
            name="member[subscribe]"
            borderRadius="0px"
          >
            Subscribe
          </Button>
        </Flex>
        <Box fontSize="sm" textAlign="center" mt="10">
          {"By subscribing, you agree with Revue's "}
          <Link
            target="_blank"
            href="https://www.getrevue.co/terms"
            rel="noreferrer"
            textDecoration="underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            href="https://www.getrevue.co/privacy"
            rel="noreferrer"
            textDecoration="underline"
          >
            Privacy Policy
          </Link>
          .
        </Box>
      </Item.Window>
    </Item>
  );
};
