import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MinimizeRoundedIcon from "@mui/icons-material/MinimizeRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import "./classes.css";

const TitleBar = () => {
  return (
    <Box
      className="titleBar"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 1,
        backgroundColor: "primary.main",
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        boxShadow: 2,
      }}
    >
      <Box className="titleBar">
        <Tooltip
          enterDelay={1000}
          enterNextDelay={1000}
          title="Refreshes the app"
        >
          <IconButton
            className="titleBarButton"
            onClick={() => electron.app.reload()}
          >
            <RefreshRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        className="titleBar"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Grandstream CTI Tool</Typography>
      </Box>
      <Box className="titleBar" sx={{ display: "flex", justifyContent: "end" }}>
        <IconButton
          className="titleBarButton"
          onClick={() => electron.app.minimize()}
        >
          <MinimizeRoundedIcon color="palette.text.primary" />
        </IconButton>
        <IconButton
          color="error"
          className="titleBarButton"
          onClick={() => electron.app.close()}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TitleBar;
