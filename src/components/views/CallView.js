import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";

import Lcd from "../phone/Lcd";
import Softkeys from "../phone/Softkeys";
import Keypad from "../phone/Keypad";

import CallOptions from "../phone/CallOptions";

const CallView = ({
  userLineStatus,
  userPhoneStatus,
  setDialerData,
  dialerData,
  userPassword,
  userIpAddress,
  showSnackbar,
}) => {
  const dialerConcat = (e) => {
    setDialerData((prev) => (prev += e.target.value));
    sendDialerKeyPress(e.target.value);
  };

  const dialerDelete = (e) => {
    setDialerData((prev) => prev.slice(0, -1));
    sendDialerDeletePress();
  };

  const sendDialerKeyPress = (lastKey) => {
    axios
      .post(
        `https://${userIpAddress}/cgi-bin/api-send_key?passcode=${userPassword}&keys=${lastKey}`,
        { credentials: "omit" }
      )
      .then((res) => {
        if (res.data.response !== "success") {
          showSnackbar("Error sending request");
        }
      })
      .catch((err) => {
        console.log(err);
        showSnackbar("Axios post error. sendDialerKeyPress");
      });
  };

  const sendDialerDeletePress = () => {
    axios
      .post(
        `https://${userIpAddress}/cgi-bin/api-send_key?passcode=${userPassword}&keys=SOFT3`,
        { credentials: "omit" }
      )
      .then((res) => {
        if (res.data.response !== "success") {
          showSnackbar("Error sending request");
        }
      })
      .catch((err) => {
        console.log(err);
        showSnackbar("Axios post error. sendDialerDeletePress");
      });
  };

  const sendSoftkeyOne = () => {
    axios
      .post(
        `https://${userIpAddress}/cgi-bin/api-send_key?passcode=${userPassword}&keys=SOFT1`,
        { credentials: "omit" }
      )
      .then((res) => {
        if (res.data.response !== "success") {
          showSnackbar("Error sending request");
        }
      })
      .catch((err) => {
        console.log(err);
        showSnackbar("Axios post error. sendSoftkeyOne");
      });
  };

  const sendSoftkeyTwo = () => {
    axios
      .post(
        `https://${userIpAddress}/cgi-bin/api-send_key?passcode=${userPassword}&keys=SOFT2`,
        { credentials: "omit" }
      )
      .then((res) => {
        if (res.data.response !== "success") {
          showSnackbar("Error sending request");
        }
      })
      .catch((err) => {
        console.log(err);
        showSnackbar("Axios post error. sendSoftkeyTwo");
      });
  };

  const sendCallStart = () => {
    axios
      .post(
        `https://${userIpAddress}/cgi-bin/api-send_key?passcode=${userPassword}&keys=SEND`,
        { credentials: "omit" }
      )
      .then((res) => {
        if (res.data.response !== "success") {
          showSnackbar("Error sending request");
        }
      })
      .catch((err) => {
        console.log(err);
        showSnackbar("Axios post error. sendCallStart");
      });
    setDialerData("");
  };

  const sendCallEnd = () => {
    axios
      .post(
        `http://${userIpAddress}/cgi-bin/api-phone_operation?passcode=${userPassword}&cmd=endcall`,
        { credentials: "omit" }
      )
      .then((res) => {
        if (res.data.response !== "success") {
          showSnackbar("Error sending request");
        }
      })
      .catch((err) => {
        console.log(err);
        showSnackbar("Axios post error. sendCallEnd");
      });
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Lcd
          setDialerData={setDialerData}
          dialerData={dialerData}
          dialerDelete={dialerDelete}
        />
      </Grid>
      <Grid item xs={12}>
        <Softkeys
          userLineStatus={userLineStatus}
          userPhoneStatus={userPhoneStatus}
          dialerData={dialerData}
          dialerDelete={dialerDelete}
          sendSoftkeyOne={sendSoftkeyOne}
          sendSoftkeyTwo={sendSoftkeyTwo}
        />
      </Grid>
      <Grid item xs={12}>
        <Keypad
          setDialerData={setDialerData}
          userIpAddress={userIpAddress}
          userPassword={userPassword}
        />
      </Grid>
      <Grid item xs={12}>
        <CallOptions sendCallStart={sendCallStart} sendCallEnd={sendCallEnd} />
      </Grid>
    </Grid>
  );
};

export default CallView;
