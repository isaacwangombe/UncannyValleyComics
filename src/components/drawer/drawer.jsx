import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
} from "@material-tailwind/react";
import CartItems from "../cartItems/cartItems";
import "./drawer.css";

const RightDrawer = ({ DrawerOpen, onClose }) => {
  const closeDrawer = () => onClose();

  return (
    <React.Fragment>
      <Drawer
        open={DrawerOpen}
        onClose={closeDrawer}
        placement="right"
        className={`" drawer-width ${DrawerOpen ? "" : "drawer-width-open"}`}
      >
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Your Cart
          </Typography>

          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <List>
          <CartItems />
        </List>
        <div className="flex justify-between mt-6">
          <Button size="sm" variant="outlined">
            Clear Cart
          </Button>
          <Button size="sm">Checkout</Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default RightDrawer;
