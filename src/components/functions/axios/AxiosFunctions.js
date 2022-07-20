import axios from "axios";
import { logError } from "../errorHandler/errorHandler";

export const sendSoftkey = (
  userIpAddress,
  userPassword,
  softKey,
  showSnackbar
) => {
  axios
    .post(
      `https://${userIpAddress}/cgi-bin/api-send_key?passcode=${userPassword}&keys=${softKey}`,
      { credentials: "omit" }
    )
    .then((res) => {
      if (res.data.response !== "success") {
        showSnackbar("Error sending request");
        logError(4, {
          err: "Error sending softkey",
          resData: res.data,
          req: res.request.responseURL,
          status: `${res.status} ${res.statusText}`,
        });
      }
    })
    .catch((err) => {
      showSnackbar("Axios post error. sendSoftkeyOne");
      logError(5, {
        err: "sendSoftkey",
        name: err.name,
        message: err.message,
        code: err.code,
        req: err.request.responseURL,
        status: `${err.request.status} ${err.request.statusText}`,
      });
    });
};

export const sendDialerData = (
  userIpAddress,
  userPassword,
  dialerData,
  showSnackbar
) => {
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
};

export const sendCallStart = (
  userIpAddress,
  userPassword,
  showSnackbar,
  setDialerData
) => {
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

export const sendCallEnd = (userIpAddress, userPassword, showSnackbar) => {
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
};
