import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";

import Lcd from "../phone/Lcd";
import Softkeys from "../phone/Softkeys";
import Keypad from "../phone/Keypad";

import CallOptions from "../phone/CallOptions";

import { getDelayTime } from "../functions/functions";
import { sendSoftkey } from "../functions/axios/AxiosFunctions";

const CallView = ({
  userLineStatus,
  userPhoneStatus,
  setDialerData,
  dialerData,
  userPassword,
  userIpAddress,
  showSnackbar,
}) => {
  const dialerDelete = (e) => {
    setDialerData((prev) => prev.slice(0, -1));
  };

  const sendSoftkeyOne = () => {
    sendSoftkey(userIpAddress, userPassword, "SOFT1", showSnackbar);
  };

  const sendSoftkeyTwo = () => {
    sendSoftkey(userIpAddress, userPassword, "SOFT2", showSnackbar);
  };

  const sendSoftkeyThree = () => {
    sendSoftkey(userIpAddress, userPassword, "SOFT3", showSnackbar);
  };

  const sendDialerData = () => {
    axios
      .post(
        `https://${userIpAddress}/cgi-bin/api-send_key?passcode=${userPassword}&keys=${dialerData
          .replace(/(.)/g, "$1:")
          .slice(0, -1)}`,
        { credentials: "omit" }
      )
      .then((res) => {
        if (res.data.response !== "success") {
          showSnackbar("Error sending request");
        } else {
          setTimeout(() => {
            sendCallStart();
          }, getDelayTime(dialerData));
        }
      })
      .catch((err) => {
        console.log(err);
        showSnackbar(`Axios post error. sendDialerData. ${err.code}`);
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
        showSnackbar(`Axios post error. sendCallStart ${err.code}`);
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
          sendSoftkeyOne={sendSoftkeyOne}
          sendSoftkeyTwo={sendSoftkeyTwo}
          sendSoftkeyThree={sendSoftkeyThree}
          sendSoftkey={sendSoftkey}
        />
      </Grid>
      <Grid item xs={12}>
        <Keypad setDialerData={setDialerData} />
      </Grid>
      <Grid item xs={12}>
        <CallOptions sendCallStart={sendDialerData} sendCallEnd={sendCallEnd} />
      </Grid>
    </Grid>
  );
};

export default CallView;
