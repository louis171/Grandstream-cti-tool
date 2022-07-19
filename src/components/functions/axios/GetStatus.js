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
