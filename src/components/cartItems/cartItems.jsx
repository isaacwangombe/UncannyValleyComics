import React from "react";
import { useState } from "react";

import "./cartItems.css";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  IconButton,
  Button,
  Tooltip,
} from "@material-tailwind/react";

const CartItems = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <Tooltip content="Material Tailwind">
        <Card className="md:w-96">
          <ListItem>
            <ListItemPrefix>
              <img
                className=" h-20 w-28 rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt="nature image"
              />
            </ListItemPrefix>
            <div className="flex justify-between w-full">
              <div>
                <Typography variant="h6" className="my-4" color="blue-gray">
                  Item
                </Typography>
                <div className="flex space-x-3">
                  <IconButton
                    size="sm"
                    variant="outlined"
                    className="rounded-full cart-item-button"
                    onClick={decrement}
                  >
                    <i className="fas fa-minus" />
                  </IconButton>
                  <div className="">{count}</div>
                  <IconButton
                    color="blue"
                    size="sm"
                    variant="outlined"
                    className="rounded-full cart-item-button"
                    onClick={increment}
                  >
                    <i className="fas fa-plus" />
                  </IconButton>
                </div>
              </div>
              <div className="">
                <div className="my-4">Price</div>
                <Button size="sm" color="red">
                  <i className="fas fa-trash" />
                </Button>
              </div>
            </div>
          </ListItem>
        </Card>
      </Tooltip>
    </div>
  );
};

export default CartItems;
