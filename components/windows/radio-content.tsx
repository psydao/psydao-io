import { Box, Icon, Image, Text, type BoxProps } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";

const spotifyBaseUrl =
  "https://open.spotify.com/oembed?url=https://open.spotify.com/playlist/";

const playlistIds = [
  "61u4KX89NkLEYDz8TKiW1a",
  "1PBcJLDCe0NwoGnsOS99vb",
  "4NX5lgD0WEWbrygRUS1J9a",
];

const getPlaylist = async (playlistId: string) => {
  return fetch(spotifyBaseUrl + playlistId).then((res) => res.json());
};

interface PlaylistCardProps extends BoxProps {
  playlistId: string;
}

const PlaylistCard = ({ playlistId, ...rest }: PlaylistCardProps) => {
  const { status, data } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylist(playlistId),
  });

  if (status === "success") {
    return (
      <Box display="grid" cursor="pointer" {...rest}>
        <Image
          src={data?.thumbnail_url || "/psydao-seo-image.png"}
          alt=""
          gridArea="1 / 1 / 2 / 2"
          objectFit="cover"
          height="100%"
          width="100%"
        />
        {data?.title && (
          <Box gridArea="1 / 1 / 2 / 2" textAlign="center" placeSelf="center">
            <Text
              as="span"
              background="transparent"
              backgroundImage="linear-gradient(to right, #f2bebe, #f2bebe)"
              boxDecorationBreak="clone"
              placeSelf="center"
              fontSize="20px"
              textAlign="center"
              fontWeight="700"
              fontStyle="italic"
              margin="0 -0.4em"
              padding="0.1em 0.4em"
            >
              {data.title}
            </Text>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box {...rest}>
      <Image
        src="/psydao-seo-image.png"
        alt=""
        gridArea="1 / 1 / 2 / 2"
        objectFit="cover"
        height="100%"
        width="100%"
      />
    </Box>
  );
};

const Catalogue = ({ children, ...rest }: BoxProps) => {
  return (
    <Box p="4" {...rest}>
      <Text
        as="h1"
        fontSize="36px"
        fontStyle="italic"
        lineHeight="100%"
        mt="3"
        textColor="#269200"
      >
        PsyDAO Radio
      </Text>
      <Text mt="3" textColor="#269200">
        Psychedelic journeys and soothing sounds curated by the community.
      </Text>
      <Box
        mt="3"
        display="grid"
        gap="3"
        gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gridAutoRows="1fr"
        sx={{
          "&::before": {
            content: "''",
            width: "0",
            paddingBottom: "100%",
            gridRow: "1 / 1",
            gridColumn: "1 / 1",
          },
          "& > div:first-of-type": {
            gridRow: "1 / 1",
            gridColumn: "1 / 1",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export const RadioContent = () => {
  const [openPlaylist, setOpenPlaylist] = useState("");

  if (openPlaylist) {
    return (
      <Box height="100%" display="flex" flexDirection="column" p="3" gap="3">
        <Box
          onClick={() => setOpenPlaylist("")}
          display="flex"
          alignItems="center"
          gap="1"
          cursor="pointer"
        >
          <Icon as={RiArrowLeftLine} />
          <Text as="span">Go back</Text>
        </Box>
        <iframe
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/playlist/${openPlaylist}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </Box>
    );
  }

  return (
    <Catalogue>
      {playlistIds.map((cur) => (
        <PlaylistCard
          key={cur}
          playlistId={cur}
          onClick={() => setOpenPlaylist(cur)}
        />
      ))}
    </Catalogue>
  );
};
