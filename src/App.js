import React, { useEffect, useState, useRef } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";

import Keypad from "./components/phone/Keypad";
import Layout from "./components/layout/Layout";

import CallView from "./components/views/CallView";
import HistoryView from "./components/views/HistoryView";
import SettingsView from "./components/views/SettingsView";
import axios from "axios";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const App = () => {
  const [dialerData, setDialerData] = useState("");

  const [userIpAddress, setUserIpAddress] = useState("192.168.5.115");
  const [userPassword, setUserPassword] = useState("D0ughnuts");
  const [userLogin, setUserLogin] = useState(false);

  const [userPhoneStatus, setUserPhoneStatus] = useState("");
  const [userLineStatus, setUserLineStatus] = useState([]);

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

  // Queries phone for status
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (userLogin) {
        axios
          .post(
            `https://${userIpAddress}/cgi-bin/api-get_phone_status?passcode=${userPassword}`,
            { credentials: "omit" }
          )
          .then((res) => {
            if (res.data.response !== "success") {
              showMessage("Error sending phone status request");
            } else {
              setUserPhoneStatus(res.data.body);
            }
          })
          .catch((err) => {
            console.log(err);
            showMessage("Error sending api-get_phone_status");
          });
        axios
          .post(
            `https://${userIpAddress}/cgi-bin/api-get_line_status?passcode=${userPassword}`
          )
          .then((res) => {
            if (res.data.response !== "success") {
              showMessage("Error sending line status request");
            } else {
              setUserLineStatus(res.data.body);
            }
          })
          .catch((err) => {
            console.log(err);
            showMessage("Error sending api-get_line_status");
          });
      }
    }, 5000);
    return () => clearInterval(intervalId); //This is important
  }, [userLogin]);

  return (
    <HashRouter>
      <Layout userPhoneStatus={userPhoneStatus}>
        <Routes>
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
              />
            }
          />
          <Route path="/history" element={<HistoryView />} />
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
      </Layout>
    </HashRouter>
  );
};

export default App;
