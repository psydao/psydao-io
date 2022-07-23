import { Box, Button, Icon, Input, Text, useClipboard } from "@chakra-ui/react";
import { useReducer, useState } from "react";
import {
  RiAddBoxLine,
  RiDeleteBin2Line,
  RiFileCopyLine,
  RiSave3Line,
} from "react-icons/ri";

import { Blobs } from "components/blobs";

const originalPalette = [
  "#ffffff",
  "#539fa2",
  "#72b1a4",
  "#abccb1",
  "#c4dbb4",
  "#d4e2b6",
];

const initialPalette = [
  "#fffafa",
  "#fff9ef",
  "#ffeff9",
  "#f2bebe",
  "#f2bebe",
  "#9835ba",
  "#a6dff2",
];

type Action =
  | { type: "add" }
  | { type: "edit"; payload: { index: number; value: string } }
  | { type: "remove"; payload: { index: number } };

const reducer = (state: string[], action: Action): string[] => {
  switch (action.type) {
    case "add":
      return [...state, state[state.length - 1]];
    case "edit": {
      const { index, value } = action.payload;
      return [...state.slice(0, index), value, ...state.slice(index + 1)];
    }
    case "remove": {
      const { index } = action.payload;
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
  }
};

const BlobsPage = () => {
  const [palette, dispatch] = useReducer(reducer, initialPalette);
  const [key, setKey] = useState(Math.random());
  const { hasCopied, onCopy } = useClipboard(JSON.stringify(palette));

  return (
    <Box h="100vh" w="100vw" p="8">
      <Blobs key={key} palette={palette} />
      <Box
        position="relative"
        zIndex="10"
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        gap="2"
        w="max-content"
        borderRadius="md"
      >
        {palette.map((value, idx) => (
          <Box
            key={idx}
            display="flex"
            gap="2"
            p="2"
            border="1px solid black"
            alignItems="center"
            borderRadius="md"
            background="#fffafaaa"
          >
            <Text fontFamily="mono">{value}</Text>
            <Input
              variant="unstyled"
              alignSelf="stretch"
              w="100px"
              type="color"
              value={value}
              onChange={(e) =>
                dispatch({
                  type: "edit",
                  payload: { index: idx, value: e.target.value },
                })
              }
            />
            <Button
              onClick={() =>
                dispatch({ type: "remove", payload: { index: idx } })
              }
              size="sm"
            >
              <Icon as={RiDeleteBin2Line} />
            </Button>
          </Box>
        ))}
        <Button
          rightIcon={<RiAddBoxLine />}
          onClick={() => dispatch({ type: "add" })}
          size="sm"
          border="1px solid black"
          alignSelf="stretch"
          fontFamily="sans-serif"
        >
          Add new color
        </Button>
        <Button
          rightIcon={<RiSave3Line />}
          size="sm"
          border="1px solid black"
          alignSelf="stretch"
          fontFamily="sans-serif"
          onClick={() => setKey(Math.random())}
        >
          Apply
        </Button>
        <Button
          rightIcon={<RiFileCopyLine />}
          size="sm"
          border="1px solid black"
          alignSelf="stretch"
          fontFamily="sans-serif"
          onClick={onCopy}
        >
          {hasCopied ? "Copied!" : "Copy"}
        </Button>
      </Box>
    </Box>
  );
};

export default BlobsPage;
