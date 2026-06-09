import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

import productService from "../../services/productService";
import {
  Container,
  Grid,
  Typography,
  Chip,
  Box,
  Paper,
  Stack,
  Skeleton,
} from "@mui/material";

import cartService from "../../services/cartService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomButton from "../../components/ui/CustomButton";

function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setCartCount } = useCart();

  const [product, setProduct] = useState(null);
  const [loading,setloading] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
  const data = await productService.getById(id);
  setProduct(data);
  };

  const handleAddToCart = async () => {
    if (!user?.token) {
      navigate("/login");
      return;
    }

    try {
      setloading(true);
      await cartService.addToCart({productId: product.id,quantity: 1,});
      const cart = await cartService.getCart();
      const totalItems = cart.items?.length || 0;
      setCartCount(totalItems);
      alert("Added to cart");
    } catch (error) {
      console.error(error);
    }
    finally{
      setloading(false)
    }
  };

  if (!product) {
  return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                height={320}
                sx={{
                  borderRadius: 4,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Skeleton
                  width={120}
                  height={40}
                />

                <Skeleton
                  width="80%"
                  height={60}
                />

                <Skeleton
                  width={180}
                  height={50}
                />

                <Skeleton
                  width={150}
                  height={40}
                />

                <Skeleton
                  width="100%"
                  height={100}
                />

                <Skeleton
                  variant="rectangular"
                  width={220}
                  height={55}
                  sx={{
                    borderRadius: 3,
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

return (
  <Container maxWidth="lg" sx={{ py: 5 }}>
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 4,
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
      >
        {/* Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{
              width: "250px",
              height:"320px",
              borderRadius: 4,
              objectFit: "cover",
              maxHeight: 500,
            }}
          />
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Chip
              label={product.categoryName}
              color="primary"
              sx={{
                width: "fit-content",
              }}
            />

            <Typography
              variant="h3"
              fontWeight={700}
            >
              {product.name}
            </Typography>

            <Typography
              variant="h4"
              color="primary"
              fontWeight={800}
            >
              ₹{product.price.toLocaleString()}
            </Typography>

            <Chip
              label={
                product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out of Stock"
              }
              color={
                product.stock > 0
                  ? "success"
                  : "error"
              }
              sx={{
                width: "fit-content",
              }}
            />

            <Typography
              variant="body1"
              color="text.secondary"
            >
              {product.description}
            </Typography>
          
          {user?.role !== "Admin" && (
            <CustomButton
              onClick={handleAddToCart}
              size="large"
              startIcon={
                <ShoppingCartIcon />
              }
              disabled={
                product.stock === 0
              }
              sx={{
                py: 1.8,
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              {loading?"Adding...":"Add to Cart"}
            </CustomButton>
          )}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);
}

export default ProductDetailPage;