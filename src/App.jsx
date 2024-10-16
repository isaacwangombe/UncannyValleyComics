import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Button, Drawer } from "@material-tailwind/react";
import Homepage from "./pages/homepage/homepage";
import NavbarWithSubmenu from "./components/navbar/navbar";
import RightDrawer from "./components/drawer/drawer";
import CartItems from "./components/cartItems/cartItems";
import About from "./pages/about/about";
import PageFlip from "./pages/pageFlip/pageFlip";

function App() {
  return (
    <>
      <NavbarWithSubmenu />
      {/* <CartItems /> */}
      {/* <Homepage /> */}
      {/* <RightDrawer /> */}
      {/* <About /> */}
      <PageFlip />
      {/* <Page2 /> */}
      {/* <Page3 /> */}
      {/* <Page4 /> */}
      {/* <GridTests /> */}
    </>
  );
}

export default App;
