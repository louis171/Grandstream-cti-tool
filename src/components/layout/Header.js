import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

import { toTitleCase } from "../functions/functions";

const Header = ({ userPhoneStatus, userLineStatus }) => {
  return (
    <Grid container spacing={0} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body1" sx={{ pr: 1 }}>
              {userPhoneStatus === ""
                ? "Unknown"
                : toTitleCase(userPhoneStatus)}
            </Typography>
            <CircleRoundedIcon
              fontSize="small"
              color={userPhoneStatus == "available" ? "success" : "error"}
            />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body1" sx={{ pr: 1 }}>
              Line 1
            </Typography>
            <CircleRoundedIcon
              fontSize="small"
              color={
                userLineStatus.state == "idle"
                  ? "success"
                  : userLineStatus.state == "unknown"
                  ? "warning"
                  : userLineStatus == "calling"
                  ? "primary"
                  : "error"
              }
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
