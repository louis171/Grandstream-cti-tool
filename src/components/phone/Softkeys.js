import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";

const Softkeys = ({
  userLineStatus,
  userPhoneStatus,
  dialerData,
  dialerDelete,
  sendSoftkeyOne,
  sendSoftkeyTwo,
}) => {
  return (
    <Grid display="flex" justifyContent="center" container spacing={1}>
      <Grid item xs={4} display="flex" justifyContent="center">
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => sendSoftkeyOne()}
        >
          Softkey 1
        </Button>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center">
        <Button
          size="small"
          variant="outlined"
          color="success"
          onClick={() => sendSoftkeyTwo()}
        >
          Softkey 2
        </Button>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => dialerDelete()}
        >
          Softkey 3
        </Button>
      </Grid>
    </Grid>
  );
};

export default Softkeys;
