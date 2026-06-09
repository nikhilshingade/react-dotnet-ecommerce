import { Grid } from "@mui/material";
import ProductCardSkeleton from "./ProductCardSkeleton";

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

function ProductGridSkeleton() {
  return (
    <Grid container sx={style.grid}>
      {[...Array(8)].map((_, index) => (
        <Grid
          item
          xs={12}   
          sm={6}    
          md={4}    
          lg={3}    
          key={index}
          sx={{ display: "flex" }}  
        >
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGridSkeleton;
