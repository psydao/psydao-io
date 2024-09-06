import { useMemo, useState } from "react";
import {
  Box,
  Icon,
  Image,
  Text,
  useMediaQuery,
  type BoxProps
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Window } from "@/components/ui/window";
import { RiArrowLeftLine } from "react-icons/ri";
import { useWindowManager } from "@/components/ui/window-manager";

const spotifyBaseUrl =
  "https://open.spotify.com/oembed?url=https://open.spotify.com/playlist/";

const playlistIds = [
  "61u4KX89NkLEYDz8TKiW1a",
  "1PBcJLDCe0NwoGnsOS99vb",
  "4NX5lgD0WEWbrygRUS1J9a"
];

const getPlaylist = async (playlistId: string) => {
  return fetch(spotifyBaseUrl + playlistId).then((res) => res.json());
};

interface PlaylistCardProps extends BoxProps {
  playlistId: string;
}

interface UseQueryData {
  thumbnail_url: string;
  title: string;
  status: boolean;
}

const PlaylistCard = ({ playlistId, ...rest }: PlaylistCardProps) => {
  const { status, data } = useQuery<UseQueryData>({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylist(playlistId)
  });

  if (status === "success") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        cursor="pointer"
        border="2px solid #f2bebe"
        {...rest}
      >
        <Image
          src={data?.thumbnail_url || "/psydao-seo-image.png"}
          alt=""
          objectFit="cover"
          height="auto"
          width="100%"
          sx={{
            aspectRatio: "1 / 1"
          }}
          borderBottom="2px solid #f2bebe"
        />
        {data?.title && (
          <Box
            textAlign="center"
            flex="1 1 auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="3"
            backgroundColor="#fff5f5"
          >
            <Text
              as="span"
              fontSize="20px"
              textAlign="center"
              fontWeight="700"
              fontStyle="italic"
              lineHeight="1.1em"
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
        gridTemplateColumns="repeat(auto-fill, minmax(170px, 1fr))"
        gridAutoRows="1fr"
        sx={{
          "&::before": {
            content: "''",
            width: "0",
            paddingBottom: "100%",
            gridRow: "1 / 1",
            gridColumn: "1 / 1"
          },
          "& > div:first-of-type": {
            gridRow: "1 / 1",
            gridColumn: "1 / 1"
          }
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const RadioContent = () => {
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

export const Radio = () => {
  const { state } = useWindowManager();
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "radio") {
      return true;
    }

    return false;
  }, [state]);

  return (
    <Window
      id="radio"
      maxHeight={{
        base: fullScreenWindow ? "100%" : "90%",
        sm: fullScreenWindow ? "100%" : "80%",
        md: fullScreenWindow ? "100%" : "650px"
      }}
      height={"100%"}
      maxWidth={{
        base: fullScreenWindow ? "100%" : "95%",
        md: fullScreenWindow ? "100%" : "600px"
      }}
      width={"100%"}
      top={{
        base: fullScreenWindow ? "0" : "55%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "50%"
      }}
      left={fullScreenWindow ? "0" : "50%"}
      transform={fullScreenWindow ? "translate(0, 0)" : "translate(-50%, -50%)"}
      fullScreenWindow={fullScreenWindow}
    >
      <Window.TitleBar />
      <Window.Content p="0">
        <RadioContent />
      </Window.Content>
    </Window>
  );
};
