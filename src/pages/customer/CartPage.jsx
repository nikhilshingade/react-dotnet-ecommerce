import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useCart } from "../../context/CartContext";
import orderService from "../../services/orderService";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Divider,
  Stack,
} from "@mui/material";

import cartService from "../../services/cartService";

function CartPage() {
  const [cart, setCart] = useState(null);
  const { setCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
  try {
    const data = await cartService.getCart();
      setCart(data);
    const totalItems = data.items?.length || 0;
      setCartCount(totalItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await orderService.placeOrder();
      alert("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncrease = async (item) => {
    try {
            await cartService.updateCartItem({
            productId: item.productId,
            quantity: item.quantity + 1,
            });
            loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecrease = async (item) => {
        try {
            await cartService.updateCartItem({
            productId: item.productId,
            quantity: item.quantity - 1,
            });
            loadCart();
        } catch (error) {
            console.error(error);
        }
    };
    const handleRemove = async (item) => {
        try {
            await cartService.updateCartItem({
            productId: item.productId,
            quantity: 0,
            });

            loadCart();
        } catch (error) {
            console.error(error);
        }
    };

  if (!cart) {
    return (
      <Container sx={{ py: 5 }}>
        Loading...
      </Container>
    );
  }

  const totalItems = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{fontWeight: 800,mb: "20px", color: "primary.main",letterSpacing: "-0.5px",}}>
        🛒 Shopping Cart
     </Typography>

      <Grid container spacing={4}>
        {/* Left Side */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {cart.items.map((item) => (
              <Paper
                key={item.productId}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  transition: "0.3s",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.08)",

                  "&:hover": {
                    transform:
                      "translateY(-2px)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.imageUrl}
                  alt={item.productName}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 3,
                    objectFit: "cover",
                  }}
                />

                <Box flex={1}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {item.productName}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    ₹
                    {item.price.toLocaleString()}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    mt={2}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDecrease(item)}
                        sx={{
                        minWidth: 36,
                        borderRadius: 2,
                        }}
                    >
                        <RemoveIcon />
                    </Button>

                    <Typography
                        fontWeight={700}
                        minWidth={30}
                        textAlign="center"
                    >
                        {item.quantity}
                    </Typography>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleIncrease(item)}
                        sx={{
                        minWidth: 36,
                        borderRadius: 2,
                        }}
                    >
                        <AddIcon />
                    </Button>

                    <Button
                        color="error"
                        onClick={() =>
                        handleDecrease({
                            ...item,
                            quantity: 1,
                        })
                        }
                        sx={{ ml: 2 }}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                    
                  </Stack>

                  <Typography
                    mt={1}
                    color="primary"
                    fontWeight={700}
                  >
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              position: "sticky",
              top: 100,
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
            >
              Order Summary
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
            >
              <Typography>
                Total Items
              </Typography>

              <Typography>
                {totalItems}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <Typography
                fontWeight={700}
              >
                Total Amount
              </Typography>

              <Typography
                color="primary"
                fontWeight={700}
              >
                ₹
                {cart.totalAmount.toLocaleString()}
              </Typography>
            </Box>

            <Button fullWidth variant="contained" size="large" onClick={handleCheckout} sx={{ py: 1.5,borderRadius: 3,fontWeight: 700,}}>
              Place Order
            </Button>
            
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;