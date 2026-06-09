import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const style = {
  grid:{
      display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "35px",
  maxWidth: "1400px",
  margin: "0 auto",   
  }
}
function ProductGrid({ products }) {
  return (
    <Grid container sx={style.grid}>
      {products.map((product) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={product.id}
          sx={{ display: "flex" }}  
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid;
