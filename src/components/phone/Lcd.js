import React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";

import TextfieldCti from "../inputs/TextfieldCti";

const Lcd = ({ setDialerData, dialerData, dialerDelete }) => {
  return (
    <Grid container>
      <Grid item xs={12} display="flex" justifyContent="center">
        <TextfieldCti
          value={dialerData}
          updateFunction={setDialerData}
          adornmentEndPosition="end"
          adornmentEndIcon={
            <IconButton onClick={() => dialerDelete()}>
              <BackspaceRoundedIcon color="primary" />
            </IconButton>
          }
          adornmentStartPosition="start"
          id="extensionExtension"
          readOnly={false}
          type="text"
        />
      </Grid>
    </Grid>
  );
};

export default Lcd;
