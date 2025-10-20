import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";

const RootMainLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      {navigation.state === "loading" && <p>Loading...</p>}
      <Outlet />
    </>
  );
};

export default RootMainLayout;