import BottomNavBar from "../navbars/bottomNavBar";
import NavBar from "../navbars/NavBar";
import React from "react";

export const Navigation = ({ children }: any) => {
  return (
    <div className="bg-black">
      <NavBar />
      <div>{children}</div>
      <BottomNavBar />
    </div>
  );
};
