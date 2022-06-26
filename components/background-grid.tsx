import { Box } from "@chakra-ui/react";

import { Grid } from "components/grid";

export const BackgroundGrid = () => {
  return (
    <Grid
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      overflow="hidden"
    >
      <Box
        background="center/cover url(/stan-grof-colorized.jpg)"
        gridArea="2 / -5 / 7 / -1"
      />
      <Box
        background="center/cover url(/shrooms-colorized.jpg)"
        gridArea="-2 / 1 / -7 / 7"
      />
    </Grid>
  );
};
