import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

import { hourToHex } from "lib/dynamic-background";
import Head from "next/head";

const hours = [
  7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5,
  6,
];

const Colors: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <Flex h="100vh" w="100vw" justify="space-between">
        {hours.map((hour) => {
          const background = hourToHex(hour);
          const color = hour >= 7 && hour <= 17 ? hourToHex(0) : hourToHex(12);
          return (
            <Flex
              key={hour}
              position="relative"
              direction="column"
              align="center"
              justifyContent="center"
              gap="16"
              p="2"
              textAlign="center"
              fontWeight="extrabold"
              fontSize="xl"
              background={background}
              color={color}
              flex="1 1 auto"
            >
              {hour === 0 && (
                <Text
                  as="span"
                  position="absolute"
                  top="10px"
                  left="50%"
                  transform="translateX(-50%)"
                >
                  😴
                </Text>
              )}
              <Text as="span">{hour}</Text>
              <Text as="span">{background}</Text>
              <Text as="span" fontWeight="normal">
                {color}
                <br />
                <Text fontSize="sm">font</Text>
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default Colors;
