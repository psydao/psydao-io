import { Box, BoxProps } from "@chakra-ui/react";
import Player from "@vimeo/player";
import { useState } from "react";

import { Pause, Play } from "components/icons";

interface PlayerControlsProps extends BoxProps {
  player: Player;
}

const PlayerControls = ({ player, ...rest }: PlayerControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Box
      color="#f2bebe"
      opacity="0"
      _hover={{ opacity: "1" }}
      transition="opacity 0.3s ease-in-out"
      onClick={() => {
        if (isPlaying) {
          player.pause();
          setIsPlaying(false);
        } else {
          player.play();
          setIsPlaying(true);
        }
      }}
      {...rest}
    >
      {isPlaying ? (
        <Pause
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          boxSize={{ base: "6", md: "10" }}
        />
      ) : (
        <Play
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          boxSize={{ base: "6", md: "10" }}
        />
      )}
    </Box>
  );
};

interface VimeoEmbedProps {
  embedId: string;
}

export const VimeoEmbed = ({ embedId }: VimeoEmbedProps) => {
  const [player, setPlayer] = useState<Player>();

  return (
    <Box overflow="hidden" h="100%" w="100%" position="relative">
      <Box
        ref={(ref: HTMLElement | null) => {
          if (ref) {
            const player = new Player(ref);
            setPlayer(player);
          }
        }}
        id="video-vimeo"
        as="iframe"
        pos="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        src={`https://player.vimeo.com/video/${embedId}?controls=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded Vimeo"
      />
      {player && (
        <PlayerControls
          player={player}
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
        />
      )}
    </Box>
  );
};
