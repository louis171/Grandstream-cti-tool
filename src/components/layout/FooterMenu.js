import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Link from "@mui/material/Link";

import { Link as RouterLink } from "react-router-dom";

import CallRoundedIcon from "@mui/icons-material/CallRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";

const FooterMenu = () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={6}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={RouterLink}
            to="/"
            label="Phone"
            icon={<CallRoundedIcon />}
          />
          <BottomNavigationAction
            component={RouterLink}
            to="/settings"
            label="Settings"
            icon={<SettingsApplicationsRoundedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default FooterMenu;
