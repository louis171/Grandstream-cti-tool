import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Softkeys = ({
  sendSoftkeyOne,
  sendSoftkeyTwo,
  sendSoftkeyThree
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
          S1
        </Button>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center">
        <Button
          size="small"
          variant="outlined"
          color="success"
          onClick={() => sendSoftkeyTwo()}
        >
          S2
        </Button>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => sendSoftkeyThree()}
        >
          S3
        </Button>
      </Grid>
    </Grid>
  );
};

export default Softkeys;
