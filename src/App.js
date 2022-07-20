import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./components/layout/Layout";
import LayoutNoNav from "./components/layout/LayoutNoNav";

import CallView from "./components/views/CallView";
import SettingsView from "./components/views/SettingsView";
import VersionView from "./components/views/VersionView";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import {
  getPhoneStatus,
  getLineStatus,
} from "./components/functions/axios/GetStatus";

const App = () => {
  const [colorMode, setColorMode] = useState("light");
  const [dialerData, setDialerData] = useState("");

  const [userIpAddress, setUserIpAddress] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userLogin, setUserLogin] = useState(false);

  const [userPhoneStatus, setUserPhoneStatus] = useState("");
  const [userLineStatus, setUserLineStatus] = useState({});

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("I'm a custom snackbar");
  const [duration, setDuration] = useState(2000);
  const [severity, setSeverity] =
    useState("success"); /** error | warning | info */

  const showMessage = (message, severity = "success", duration = 2000) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  // Queries phone for status
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (userLogin) {
        getPhoneStatus(
          userIpAddress,
          userPassword,
          showMessage,
          setUserPhoneStatus
        );
        getLineStatus(
          userIpAddress,
          userPassword,
          showMessage,
          setUserLineStatus
        );
      }
    }, 1000);
    return () => clearInterval(intervalId); //This is important
  }, [userLogin]);

  return (
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route
            element={
              <Layout
                userPhoneStatus={userPhoneStatus}
                userLineStatus={userLineStatus}
              />
            }
          >
            <Route
              path="/"
              element={
                <CallView
                  userLineStatus={userLineStatus}
                  userPhoneStatus={userPhoneStatus}
                  setDialerData={setDialerData}
                  dialerData={dialerData}
                  userPassword={userPassword}
                  userIpAddress={userIpAddress}
                  showSnackbar={showMessage}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <SettingsView
                  setUserIpAddress={setUserIpAddress}
                  userIpAddress={userIpAddress}
                  setUserPassword={setUserPassword}
                  userPassword={userPassword}
                  setUserLogin={setUserLogin}
                  userLogin={userLogin}
                  colorMode={colorMode}
                  saveColorMode={saveColorMode}
                />
              }
            />
          </Route>
          <Route element={<LayoutNoNav />}>
            <Route path="/version" element={<VersionView />} />
          </Route>
        </Routes>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          <Alert variant="filled" onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
