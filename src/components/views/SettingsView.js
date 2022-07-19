import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

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
  saveColorMode,
  colorMode,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        fullWidth
        fullScreen
        aria-labelledby="help-dialog-title"
        aria-describedby="help-dialog-description"
      >
        <DialogTitle id="help-dialog-title">
          Grandstream CTI Tool Help
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }} id="help-dialog-description">
            The Grandstream CTI Tool is designed to work with GXP and GRP series
            Grandstream IP Handsets.
          </DialogContentText>
          <DialogContentText sx={{ mb: 2 }} id="help-dialog-description">
            <Typography sx={{ fontWeight: "bold" }}>
              Network -{">"} Remote Control
              <br />
            </Typography>
            Please enable 'Action URI Support' and 'Remote Control Pop up Window
            Support' in the handsets web interface. <br /> Using 'Action URI
            Allowed IP List' please whitelist IP address of the PC you will be
            running the app on.
          </DialogContentText>
          <DialogContentText id="help-dialog-description">
            <Typography sx={{ fontWeight: "bold" }}>
              Settings -{">"} Call Features
              <br />
            </Typography>
            Please enable “Click-To-Dial Feature” to allow the app to initialise
            calls.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignContent: "center",
              p: 2,
              border: "1px solid rgba(118, 118, 118, 0.3)",
              borderRadius: "4px",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Button
              sx={{
                mr: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              color="inherit"
              onClick={() => saveColorMode()}
            >
              <Typography
                fontSize="inherit"
                fontWeight="inherit"
                lineHeight="inherit"
                letterSpacing="inherit"
                sx={{ m: 0, mr: 1, p: 0 }}
              >
                {colorMode} mode
              </Typography>
              {colorMode === "dark" ? (
                <Brightness7Icon sx={{ m: 0, p: 0, width: "16px" }} />
              ) : (
                <Brightness4Icon sx={{ m: 0, p: 0, width: "16px" }} />
              )}
            </Button>
          </Box>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={12}>
          <Button onClick={() => setDialogOpen(true)} variant="contained">
            Help
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingsView;
