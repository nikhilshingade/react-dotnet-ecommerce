import {
  Grid,
  Paper,
  Stack,
  Box,
  Divider,
  Container,
  Skeleton,
} from "@mui/material";

function CartPageSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>

        {/* Left Side — Cart Items */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {[...Array(3)].map((_, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                {/* Product Image */}
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 3,
                    flexShrink: 0,
                  }}
                />

                {/* Product Details */}
                <Box
                  flex={1}
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  {/* Product Name */}
                  <Skeleton variant="text" animation="wave" width="60%" height={28} />

                  {/* Price */}
                  <Skeleton variant="text" animation="wave" width="30%" height={22} />

                  {/* Quantity controls row */}
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Skeleton variant="rounded" animation="wave" width={39} height={34} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="text"    animation="wave" width={30} height={30} />
                    <Skeleton variant="rounded" animation="wave" width={39} height={34} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="circular" animation="wave" width={34} height={34} />
                  </Stack>

                  {/* Item Total */}
                  <Skeleton variant="text" animation="wave" width="25%" height={22} />
                </Box>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Right Side — Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              position: { md: "sticky" },
              top: 100,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {/* Title */}
            <Skeleton variant="text" animation="wave" width="55%" height={32} sx={{ mb: 3 }} />

            <Divider sx={{ mb: 2 }} />

            {/* Total Items row */}
            <Stack direction="row" gap={1} mb={2.5}>
              <Skeleton variant="text" animation="wave" width={90} height={24} />
              <Skeleton variant="text" animation="wave" width={30} height={24} />
            </Stack>

            {/* Total Amount row */}
            <Stack direction="row" gap={1} mb={3}>
              <Skeleton variant="text" animation="wave" width={110} height={24} />
              <Skeleton variant="text" animation="wave" width={70} height={24} />
            </Stack>

            {/* Place Order button */}
            <Skeleton
              variant="rounded"
              animation="wave"
              height={52}
              sx={{ borderRadius: 3 }}
            />
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default CartPageSkeleton;
