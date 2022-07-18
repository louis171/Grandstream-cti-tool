import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const phoneKeys = [
  { id: 1, value: 1, label: 1 },
  { id: 2, value: 2, label: 2 },
  { id: 3, value: 3, label: 3 },
  { id: 4, value: 4, label: 4 },
  { id: 5, value: 5, label: 5 },
  { id: 6, value: 6, label: 6 },
  { id: 7, value: 7, label: 7 },
  { id: 8, value: 8, label: 8 },
  { id: 9, value: 9, label: 9 },
  { id: 10, value: "*", label: "*" },
  { id: 11, value: 0, label: 0 },
  { id: 12, value: "#", label: "#" },
];

const Keypad = ({ setDialerData, userIpAddress, userPassword }) => {
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

  return (
    <Grid container spacing={2}>
      {phoneKeys.map((key) => (
        <Grid key={key.id} xs={4} item display="flex" justifyContent="center">
          <Button
            value={key.value}
            onClick={(e) => dialerConcat(e)}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 999, fontSize: 20 }}
          >
            {key.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Keypad;
