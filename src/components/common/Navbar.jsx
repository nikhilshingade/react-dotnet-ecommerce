import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import cartService from "../../services/cartService"
import { useCart } from "../../context/CartContext";

import {AppBar,Toolbar,Typography,Button,Box,Container,IconButton,Drawer,List,ListItem,ListItemButton,ListItemText,Badge,InputBase,Paper,} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount, setCartCount } = useCart();

 useEffect(() => {
    if (user?.token) {
      fetchCartCount();
    }
 }, [user]);

console.log("ROLE:", user?.role);
const fetchCartCount = async () => {
  try {
    const cart = await cartService.getCart();
    const totalItems = cart?.items?.length ?? 0;
    setCartCount(totalItems);} 
  catch (error) {
      console.error(error);
    }
};

const menuItems = user?.role === "Admin" ? ["Home", "Admin Panel"] : user?.role === "User"? ["Home", "Orders"] : ["Home"];

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid #E2E8F0",
          backgroundColor: "#fff",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/* Logo */}
            <Typography variant="h5" fontWeight={700}  sx={{mr: 4,cursor: "pointer",}}
              onClick={() => navigate("/")}>
              ShopHub
            </Typography>

            {/* Search Desktop */}
            <Paper
              component="form"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                px: 2,
                py: 0.5,
                flexGrow: 1,
                maxWidth: 450,
                border: "1px solid #E2E8F0",
                boxShadow: "none",
              }}
            >
              <SearchIcon />
              <InputBase
                placeholder="Search products..."
                sx={{ ml: 1, flex: 1 }}
              />
            </Paper>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Menu */}
            <Box sx={{ display: {xs: "none",md: "flex",}, alignItems: "center",gap: 1,}}>
              <Button  color="inherit" onClick={() => navigate("/")}>
                Home
              </Button>

              {user?.role === "Admin" ? (
                <>
                  <Button color="inherit" onClick={() => navigate("/admin/products")}>
                    Admin Panel
                  </Button>
                </>
                ) : user?.token ? (
                  <>
                    <IconButton onClick={() => navigate("/cart")}>
                      <Badge
                        badgeContent={cartCount}
                        color="primary"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                    <Button
                      color="inherit"
                      onClick={() => navigate("/orders")}
                    >
                      Orders
                    </Button>
                  </>
                ) : null}

              {user?.token ? (
              <>
                <Typography variant="body2" sx={{mx: 1,fontWeight: 600,}}>
                  {user.email}
                </Typography>

                <Button color="error" variant="outlined"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}>
                  Logout
                </Button>
              </>
              ) : (
                <>
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="contained" onClick={() => navigate("/register")}>
                  Register
                </Button>                
                </>
              )}
            </Box>

            {/* Mobile Menu */}
            <IconButton
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            
            {menuItems.map((item) => (
              <ListItem disablePadding key={item}>
                <ListItemButton
                  onClick={() => { setOpen(false);
                    if (item === "Home")
                      navigate("/");

                    if (item === "Orders")
                      navigate("/orders");

                    if (item === "Admin Panel")
                      navigate("/admin/products");
                  }}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}

            {!user?.token && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setOpen(false);
                      navigate("/login");
                    }}
                  >
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setOpen(false);
                      navigate("/register");
                    }}
                  >
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            )}

            <ListItem disablePadding>
              {user?.role !== "Admin" &&
                user?.token && (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setOpen(false);
                        navigate("/cart");
                      }}
                    >
                      <ListItemText
                        primary={`Cart (${cartCount})`}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
            </ListItem>
            {user?.token &&(<Button sx={{border:"1px solid black",padding:"5px",width:"70px",marginLeft:"10px",color:"white",backgroundColor:"red"}}
                onClick={() => {logout(); setOpen(false);   navigate("/"); }}>
                Logout
            </Button>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;