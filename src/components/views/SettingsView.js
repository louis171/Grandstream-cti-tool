import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import TextfieldCti from "../inputs/TextfieldCti";
import PasswordCti from "../inputs/PasswordCti";

import { validateIPaddress } from "../functions/functions";

const SettingsView = ({
  setUserIpAddress,
  userIpAddress,
  setUserPassword,
  userPassword,
  setUserLogin,
  userLogin,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextfieldCti
          value={userIpAddress}
          updateFunction={setUserIpAddress}
          adornmentStartPosition="start"
          adornmentStartIcon={<DeviceHubRoundedIcon color="primary" />}
          adornmentEndPosition="end"
          id="settingsIp"
          readOnly={false}
          label="IP Address"
          type="text"
          tooltipText="IP address of the handset"
          error={
            userIpAddress.length > 0 ? validateIPaddress(userIpAddress) : null
          }
          helperText={
            userIpAddress.length > 0
              ? validateIPaddress(userIpAddress)
                ? "Invalid IP Address"
                : ""
              : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordCti
          value={userPassword}
          updateFunction={setUserPassword}
          adornmentPosition="start"
          adornmentIcon={<LockRoundedIcon color="primary" />}
          id="settingsPassword"
          readOnly={false}
          label="Password"
          type="text"
          tooltipText="Admin password of the handset"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => setUserLogin((prevUserLogin) => !prevUserLogin)}
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
