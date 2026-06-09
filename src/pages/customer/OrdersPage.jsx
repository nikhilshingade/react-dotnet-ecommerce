import {
  Container,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import orderService from "../../services/orderService";
import cartService from "../../services/cartService";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const { setCartCount } = useCart();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
    //   for the cartcontext
      const data1 = await cartService.getCart();
      const totalItems = data1.items?.length || 0;
      setCartCount(totalItems);
      
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        My Orders
      </Typography>

      <Stack spacing={3}>
        {orders.map((order) => (
          <Paper
            key={order.orderId}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography
              fontWeight={700}
            >
              Order #{order.orderId}
            </Typography>

            <Typography>
              Status: {order.status}
            </Typography>

            <Typography>
              ₹
              {order.totalAmount.toLocaleString()}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default OrdersPage;