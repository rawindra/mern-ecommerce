import { FC } from "react";

import { Box, Paper } from "@mui/material";

interface BannerProps {
  title: string;
}

const Banner: FC<BannerProps> = ({ title }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": {
          mb: 3,
          height: 40,
          fontSize: 25,
          width: "40%",
          textAlign: "center",
        },
      }}
    >
      <Paper elevation={3}>{title}</Paper>
    </Box>
  );
};

export default Banner;
