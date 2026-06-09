import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Box,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CustomButton from "../ui/CustomButton";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/cartService";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const style = {
  cardbox:{
    height: 190,
    flexShrink: 0,
    overflow: "hidden",
    bgcolor: "grey.50",
    position: "relative",
  },
  cardimg:{
    height: 240,
    width: 260,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#f8f9fa",
    p: 2,
  },
  isinstock:{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: "rgba(255,255,255,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    bgcolor: "error.main",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: 0.5,
  },
  categoryName:{
    alignSelf: "flex-start",
    mb: 1,
    height: 22,
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: 0.3,
    bgcolor: "primary.50",
    color: "primary.700",
    border: "1px solid",
    borderColor: "primary.200",
    borderRadius: "6px",
  },
  CardContent:{
    flex: 1,               
    display: "flex",
    flexDirection: "column",
    p: "12px 14px 14px",
    "&:last-child": { pb: "14px" }, 
    gap: 0,
  },
  productname:{
    fontWeight: 700,
    fontSize: "0.92rem",
    lineHeight: 1.35,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    mb: 0.6,
    color: "text.primary",
    minHeight: "2.7em", 
  },
  description:{
    color: "black",
    fontSize: "0.78rem",
    lineHeight: 1.45,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    mb: "auto",           
    minHeight: "2.9em",
  },
  pricestock:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:"8px"
  },
  price:{
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "text.primary",
    letterSpacing: "-0.3px",
  }

}

const radomImg = "https://placehold.co/600x600/f5f5f5/999999?text=No+Image";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setCartCount } = useCart();
  const [loading, setloading] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!user?.token) {
      navigate("/login");
      return;
    }
    try {
      setloading(true);
      await cartService.addToCart({ productId: product.id, quantity: 1 });
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

  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      sx={{
        width: "100%",         
        height: 420,            
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        borderRadius: "14px",
        border: "1px solid",
        borderColor: "grey.200",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        bgcolor: "background.paper",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.13)",
          borderColor: "primary.light",
          "& .card-img": {
            transform: "scale(1.04)",
          },
        },
      }}>

      <Box sx={style.cardbox}>
        <CardMedia style={style.cardimg} component="img" image={product.imageUrl?product.imageUrl:radomImg} alt={product.name} className="card-img"/>        
        {!isInStock && (
          <Box sx={style.isinstock}>
            <Chip label="Out of Stock" size="small" sx={style.label}/>
          </Box>
        )}
      </Box>

      {/* card body */}
      <CardContent sx={style.CardContent}>
        
        <Chip label={product.categoryName} size="small" sx={style.categoryName}/>

        <Tooltip title={product.name} enterDelay={600} placement="top">
          <Typography variant="subtitle1"  sx={style.productname}>
            {product.name}
          </Typography>
        </Tooltip>

        <Tooltip title={product.description} enterDelay={600} placement="top">
          <Typography variant="body2" sx={style.description}>
            {product.description}
          </Typography>
        </Tooltip>

        <Stack sx={style.pricestock}>

          <Typography sx={style.price}>
            {formattedPrice}
          </Typography>
          {isInStock ? (
            <Chip
              icon={
                isLowStock ? (
                  <WarningAmberIcon sx={{ fontSize: "13px !important" }} />
                ) : (
                  <TaskAltIcon sx={{ fontSize: "13px !important" }} />
                )
              }
              label={isLowStock ? `Only ${product.stock} left` : `${product.stock} in stock`}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.77rem",
                fontWeight: 700,
                bgcolor: isLowStock ? "warning.50" : "#c2f2c2",
                color: isLowStock ? "warning.800" : "success.800",
                border: "1px solid",
                borderColor: isLowStock ? "warning.200" : "success.200",
                borderRadius: "6px",
                "& .MuiChip-icon": {
                  ml: "6px",
                  color: "inherit",
                },
              }}
            />
          ) : (
            <Chip
              icon={<WarningAmberIcon sx={{ fontSize: "13px !important" }} />}
              label="Out of Stock"
              size="small"
              sx={{
                height: 22,
                fontSize: "0.66rem",
                fontWeight: 600,
                bgcolor: "#e8938b",
                color: "error.800",
                border: "1px solid",
                borderColor: "error.200",
                borderRadius: "6px",
                "& .MuiChip-icon": { ml: "6px", color: "inherit" },
              }}
            />
          )}
        </Stack>
        {user?.role !== "Admin" && (
          <CustomButton
            variant="contained"
            startIcon={<ShoppingCartIcon sx={{ fontSize: "17px !important" }} />}
            onClick={handleAddToCart}
            disabled={!isInStock}
            fullWidth
            sx={{
              borderRadius: "9px",
              fontWeight: 700,
              fontSize: "0.82rem",
              textTransform: "none",
              py: 1,
              mt: "auto",
              boxShadow: "none",
              "&:hover": { boxShadow: "0 4px 14px rgba(25,118,210,0.3)" },
            }}
          >
            {loading?"Adding..":isInStock ? "Add to Cart" : "Notify Me"}
          </CustomButton>
        )}
      </CardContent>
    </Card>
  );
}

export default ProductCard;
