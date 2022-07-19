import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PhoneDisabledRoundedIcon from "@mui/icons-material/PhoneDisabledRounded";

const ActiveCall = ({ handleClose, open }) => {
  return (
    <Dialog
      open={false}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
        Active Call
      </DialogTitle>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button size="large" variant="outlined" color="success">
          <LocalPhoneRoundedIcon />
        </Button>
        <Button size="large" variant="outlined" color="error">
          <PhoneDisabledRoundedIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActiveCall;
