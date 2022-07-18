import axios from "axios";

export const getPhoneStatus = (
  userIpAddress,
  userPassword,
  showMessage,
  setUserPhoneStatus
) => {
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
      showMessage(`Error sending api-get_phone_status. ${err.code}`);
    });
};

export const getLineStatus = (
  userIpAddress,
  userPassword,
  showMessage,
  setUserLineStatus
) => {
  axios
    .post(
      `https://${userIpAddress}/cgi-bin/api-get_line_status?passcode=${userPassword}`
    )
    .then((res) => {
      if (res.data.response !== "success") {
        showMessage("Error sending line status request");
      } else {
        setUserLineStatus(res.data.body[0]);
      }
    })
    .catch((err) => {
      console.log(err);
      showMessage("Error sending api-get_line_status");
    });
};

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
      }
    })
    .catch((err) => {
      console.log(err);
      showSnackbar("Axios post error. sendSoftkeyOne");
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
      }
    })
    .catch((err) => {
      console.log(err);
      showSnackbar(`Axios post error. sendCallStart ${err.code}`);
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
      }
    })
    .catch((err) => {
      console.log(err);
      showSnackbar("Axios post error. sendCallEnd");
    });
};
