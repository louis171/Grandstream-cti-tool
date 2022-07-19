import axios from "axios";

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
