import React, { Component, useState } from "react";
import { withSnackbar } from "../../SnackbarHOC";

class HistoryView extends Component {
  render() {
    return (
      <div>
        Higher-Order Component Tutorial
        <button onClick={() => this.props.snackbarShowMessage("Wow")}>
          Wow
        </button>
      </div>
    );
  }
}
export default withSnackbar(HistoryView);
