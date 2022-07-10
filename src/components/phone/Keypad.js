import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { experimentalStyled as styled } from "@mui/material/styles";

import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PhoneDisabledRoundedIcon from "@mui/icons-material/PhoneDisabledRounded";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";

import TextfieldCti from "../inputs/TextfieldCti";

const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  backgroundColor: "none",
  border: "unset",
  boxShadow: "unset",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 999,
}));

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

const Keypad = ({
  setDialerData,
  dialerData,
  userIpAddress,
  userPassword,
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

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} display="flex" justifyContent="center">
            <TextfieldCti
              value={dialerData}
              updateFunction={setDialerData}
              adornmentEndIcon={
                dialerData ? (
                  <IconButton onClick={() => dialerDelete()}>
                    <BackspaceRoundedIcon color="primary" />
                  </IconButton>
                ) : null
              }
              adornmentEndPosition="end"
              adornmentStartPosition="start"
              id="extensionExtension"
              readOnly={false}
              label="Dialer"
              type="text"
            />
          </Grid>
          {phoneKeys.map((key) => (
            <Grid item xs={4} key={key.id}>
              <Item>
                <Button
                  value={key.value}
                  onClick={(e) => dialerConcat(e)}
                  variant="contained"
                >
                  {key.label}
                </Button>
              </Item>
            </Grid>
          ))}
          <Grid item xs={12} display="flex" justifyContent="space-around">
            <Button color="success" variant="contained">
              <LocalPhoneRoundedIcon />
            </Button>
            <Button color="error" variant="contained">
              <PhoneDisabledRoundedIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Keypad;
