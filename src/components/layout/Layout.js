import React from "react";
import Container from "@mui/material/Container";
import FooterMenu from "./FooterMenu";
import Header from "./Header";
import TitleBar from "./TitleBar";
import { Outlet } from "react-router";

const Layout = ({
  userPhoneStatus,
  userLineStatus,
  colorMode,
  saveColorMode,
}) => {
  return (
    <>
      <TitleBar colorMode={colorMode} saveColorMode={saveColorMode} />
      <Container component="header" maxWidth="sm">
        <Header
          userPhoneStatus={userPhoneStatus}
          userLineStatus={userLineStatus}
        />
      </Container>
      <Container component="main" maxWidth="sm">
        <Outlet />
      </Container>
      <Container component="footer" maxWidth="sm">
        <FooterMenu />
      </Container>
    </>
  );
};

export default Layout;
