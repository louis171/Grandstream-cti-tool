import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import TextfieldCti from "../inputs/TextfieldCti";

const SettingsView = ({
  setUserIpAddress,
  userIpAddress,
  setUserPassword,
  userPassword,
  setUserLogin,
  userLogin
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextfieldCti
          value={userIpAddress}
          updateFunction={setUserIpAddress}
          adornmentEndPosition="end"
          adornmentStartPosition="start"
          adornmentStartIcon={<DeviceHubRoundedIcon color="primary" />}
          id="settingsIp"
          readOnly={false}
          label="IP Address"
          type="text"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextfieldCti
          value={userPassword}
          updateFunction={setUserPassword}
          adornmentEndPosition="end"
          adornmentStartPosition="start"
          adornmentStartIcon={<LockRoundedIcon color="primary" />}
          id="settingsPassword"
          readOnly={false}
          label="Password"
          type="text"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Button
          onClick={() => setUserLogin(prevUserLogin => !prevUserLogin)}
          fullWidth
          variant="contained"
        >
          {userLogin === true ? "Logout" : "Login"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingsView;
