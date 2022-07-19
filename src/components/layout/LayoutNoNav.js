import React from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router";
import TitleBar from "./TitleBar";

const LayoutNoNav = () => {
  return (
    <>
      <TitleBar />
      <Container
        component="main"
        maxWidth="sm"
      >
        <Outlet />
      </Container>
    </>
  );
};

export default LayoutNoNav;
