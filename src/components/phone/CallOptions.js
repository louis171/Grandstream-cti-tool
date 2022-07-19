import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PhoneDisabledRoundedIcon from "@mui/icons-material/PhoneDisabledRounded";

const CallOptions = ({ sendCallStart, sendCallEnd }) => {
  return (
    <Grid display="flex" justifyContent="space-evenly" container spacing={1}>
      <Grid item xs={4} display="flex" justifyContent="center">
        <Button
          onClick={() => sendCallStart()}
          size="large"
          variant="outlined"
          color="success"
        >
          <LocalPhoneRoundedIcon />
        </Button>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center">
        <Button
          onClick={() => sendCallEnd()}
          size="large"
          variant="outlined"
          color="error"
        >
          <PhoneDisabledRoundedIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default CallOptions;
