import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MinimizeRoundedIcon from "@mui/icons-material/MinimizeRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";

import "./classes.css";
import DialogCti from "../dialog/DialogCti";

import { Link as RouterLink } from "react-router-dom";

const TitleBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [dialogHelpOpen, setDialogHelpOpen] = useState(false);
  const handleDialogHelpClose = () => {
    setDialogHelpOpen(false);
  };

  return (
    <>
      <DialogCti
        dialogOpen={dialogHelpOpen}
        handleDialogClose={handleDialogHelpClose}
        title="Grandstream CTI Tool Help"
        body={[
          {
            id: 0,
            content:
              "The Grandstream CTI Tool is designed to work with GXP and GRP series Grandstream IP Handsets.",
            br: 1,
          },
          {
            id: 1,
            content: "Network -> Remote Control",
            sx: { fontWeight: "bold" },
          },
          {
            id: 2,
            content:
              "Please enable 'Action URI Support' and 'Remote Control Pop up Window Support' in the handsets web interface. Using 'Action URI Allowed IP List' please whitelist IP address of the PC you will be running the app on.",
            br: 1,
          },
          {
            id: 3,
            content: "Settings -> Call Features",
            sx: { fontWeight: "bold" },
          },
          {
            id: 4,
            content:
              "Please enable “Click-To-Dial Feature” to allow the app to initialise calls.",
          },
        ]}
        buttonText="Close"
      />

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
          <IconButton
            className="titleBarButton"
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuList>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                electron.app.reload();
              }}
            >
              <ListItemIcon>
                <RefreshRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Refresh</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                electron.app.devTools();
              }}
            >
              <ListItemIcon>
                <BuildRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Dev Tools</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                setDialogHelpOpen(true);
              }}
            >
              <ListItemIcon>
                <HelpRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Help</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem
              component={RouterLink}
              to="/version"
              onClick={() => {
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <InfoRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>About</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
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
        <Box
          className="titleBar"
          sx={{ display: "flex", justifyContent: "end" }}
        >
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
    </>
  );
};

export default TitleBar;
