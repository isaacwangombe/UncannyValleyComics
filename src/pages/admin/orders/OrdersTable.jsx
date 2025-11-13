import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

const statusColors = {
  pending: "warning",
  paid: "success",
  shipped: "info",
  completed: "primary",
  cancelled: "secondary",
  refunded: "dark",
};

const OrdersTable = ({ orders, onView }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Total</th>
          <th>Date</th>
          <th>Items</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length ? (
          orders.map((o) => {
            // 🧠 Extract first/last name from shipping_address.user_info
            const userInfo = o.shipping_address?.user_info || {};
            const fullName =
              [userInfo.first_name, userInfo.last_name]
                .filter(Boolean)
                .join(" ") ||
              o.user?.email ||
              "Guest";

            return (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{fullName}</td>
                <td>{o.shipping_address?.phone || o.phone_number || "—"}</td>
                <td>
                  <Badge bg={statusColors[o.status] || "secondary"}>
                    {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                  </Badge>
                </td>
                <td>${Number(o.total || 0).toFixed(2)}</td>
                <td>{new Date(o.created_at).toLocaleString()}</td>
                <td>{o.items?.length || 0}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => onView(o)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={8} className="text-center text-muted">
              No orders found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default OrdersTable;
