import { Box } from "@chakra-ui/react";

import { Cloud } from "components/cloud";
import { Grid } from "components/grid";

export const BackgroundGrid = () => {
  return (
    <>
      <Cloud
        top="-20px"
        right="-10%"
        height="40%"
        width="90%"
        minHeight="150px"
        minWidth="500px"
        maxHeight="800px"
        maxWidth="1500px"
        fadeInDuration="3s"
      />
      <Cloud
        right="50%"
        bottom="100px"
        transform="translateX(50%)"
        height="30%"
        width="50%"
        minHeight="150px"
        minWidth="500px"
        maxHeight="600px"
        maxWidth="1000px"
        fadeInDuration="10s"
      />
      <Grid position="absolute" top={0} right={0} bottom={0} left={0}>
        <Box
          background="center/cover url(/stan-grof-colorized.jpg)"
          gridArea="2 / -5 / 7 / -1"
        />
        <Box
          background="center/cover url(/shrooms-colorized.jpg)"
          gridArea="-2 / 1 / -7 / 7"
        />
      </Grid>
    </>
  );
};
