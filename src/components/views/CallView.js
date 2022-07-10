import React from "react";
import Keypad from "../phone/Keypad";

const CallView = (
  { setDialerData, dialerData, userPassword, userIpAddress, showSnackbar }
) => {
  return (
    <Keypad
      setDialerData={setDialerData}
      dialerData={dialerData}
      userPassword={userPassword}
      userIpAddress={userIpAddress}
      showSnackbar={showSnackbar}
    />
  );
};

export default CallView;
