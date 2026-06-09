import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 8,
        py: 3,
        borderTop: "1px solid #E2E8F0",
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          align="center"
          color="text.secondary"
        >
          © 2026 ShopHub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;