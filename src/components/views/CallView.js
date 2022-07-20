import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";

import Lcd from "../phone/Lcd";
import Softkeys from "../phone/Softkeys";
import Keypad from "../phone/Keypad";

import CallOptions from "../phone/CallOptions";

import { getDelayTime } from "../functions/functions";
import { sendSoftkey } from "../functions/axios/AxiosFunctions";
import { logError } from "../functions/errorHandler/errorHandler";

const CallView = ({
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
    if (userIpAddress.length > 0 && userPassword.length > 0) {
      sendSoftkey(userIpAddress, userPassword, "SOFT1", showSnackbar);
    }
  };

  const sendSoftkeyTwo = () => {
    if (userIpAddress.length > 0 && userPassword.length > 0) {
      sendSoftkey(userIpAddress, userPassword, "SOFT2", showSnackbar);
    }
  };

  const sendSoftkeyThree = () => {
    if (userIpAddress.length > 0 && userPassword.length > 0) {
      sendSoftkey(userIpAddress, userPassword, "SOFT3", showSnackbar);
    }
  };

  const sendDialerData = () => {
    if (userIpAddress.length > 0 && userPassword.length > 0) {
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
            logError(4, {
              err: "Error sending dialer data",
              resData: res.data,
              req: res.request.responseURL,
              status: `${res.status} ${res.statusText}`,
            });
          } else {
            setTimeout(() => {
              sendCallStart();
            }, getDelayTime(dialerData));
          }
        })
        .catch((err) => {
          console.log(err);
          showSnackbar(`Axios post error. sendDialerData. ${err.code}`);
          logError(5, {
            err: "sendDialerData",
            name: err.name,
            message: err.message,
            code: err.code,
            req: err.request.responseURL,
            status: `${err.request.status} ${err.request.statusText}`,
          });
        });
    }
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
          logError(4, {
            err: "Error sending call start",
            resData: res.data,
            req: res.request.responseURL,
            status: `${res.status} ${res.statusText}`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        showSnackbar(`Axios post error. sendCallStart ${err.code}`);
        logError(5, {
          err: "sendCallStart",
          name: err.name,
          message: err.message,
          code: err.code,
          req: err.request.responseURL,
          status: `${err.request.status} ${err.request.statusText}`,
        });
      });
    setDialerData("");
  };

  const sendCallEnd = () => {
    if (userIpAddress.length > 0 && userPassword.length > 0) {
      axios
        .post(
          `http://${userIpAddress}/cgi-bin/api-phone_operation?passcode=${userPassword}&cmd=endcall`,
          { credentials: "omit" }
        )
        .then((res) => {
          if (res.data.response !== "success") {
            showSnackbar("Error sending request");
            logError(4, {
              err: "Error sending call end",
              resData: res.data,
              req: res.request.responseURL,
              status: `${res.status} ${res.statusText}`,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          showSnackbar("Axios post error. sendCallEnd");
          logError(5, {
            err: "sendCallEnd",
            name: err.name,
            message: err.message,
            code: err.code,
            req: err.request.responseURL,
            status: `${err.request.status} ${err.request.statusText}`,
          });
        });
    }
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
