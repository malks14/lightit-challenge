import React from "react";
import "./MainHeader.css";

interface MainHeaderProps {
    children: React.ReactNode;
  }

const MainHeader = (mainHeaderProps: MainHeaderProps) => {
  const { children } = mainHeaderProps;

  return <header className="main-header">{children}</header>;
};

export default MainHeader;