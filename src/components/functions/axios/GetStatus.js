import axios from "axios";
import { logError } from "../errorHandler/errorHandler";

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
        logError(4, {
          err: "Error getting phone status",
          resData: res.data,
          req: res.request.responseURL,
          status: `${res.status} ${res.statusText}`,
        });
      } else {
        setUserPhoneStatus(res.data.body);
      }
    })
    .catch((err) => {
      console.log(err);
      showMessage(`Error sending api-get_phone_status. ${err.code}`);
      logError(5, {
        err: "getPhoneStatus",
        name: err.name,
        message: err.message,
        code: err.code,
        req: err.request.responseURL,
        status: `${err.request.status} ${err.request.statusText}`,
      });
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
        logError(4, {
          err: "Error getting line status",
          resData: res.data,
          req: res.request.responseURL,
          status: `${res.status} ${res.statusText}`,
        });
      } else {
        setUserLineStatus(res.data.body[0]);
      }
    })
    .catch((err) => {
      console.log(err);
      showMessage("Error sending api-get_line_status");
      logError(5, {
        err: "getLineStatus",
        name: err.name,
        message: err.message,
        code: err.code,
        req: err.request.responseURL,
        status: `${err.request.status} ${err.request.statusText}`,
      });
    });
};
