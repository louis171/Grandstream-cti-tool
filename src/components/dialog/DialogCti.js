import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

import { guidGenerator } from "../functions/functions";

const DialogCti = ({
  dialogOpen,
  handleDialogClose,
  title,
  body,
  buttonText,
}) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      fullWidth
      fullScreen
      aria-labelledby="help-dialog-title"
      aria-describedby="help-dialog-description"
    >
      <DialogTitle id="help-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {body.map((item) => (
          <React.Fragment key={guidGenerator()}>
            <DialogContentText
              variant={item.variant}
              sx={item.sx}
              key={item.id}
            >
              {item.content}
            </DialogContentText>
            {item.br === 1 ? <br key={guidGenerator()} /> : null}
          </React.Fragment>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={handleDialogClose}
          autoFocus
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCti;
