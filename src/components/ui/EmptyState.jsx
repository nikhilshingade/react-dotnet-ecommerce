import {
  Box,
  Typography,
} from "@mui/material";

function EmptyState({
  message = "No data found",
}) {
  return (
    <Box
      textAlign="center"
      py={8}
    >
      <Typography
        variant="h6"
        color="text.secondary"
      >
        {message}
      </Typography>
    </Box>
  );
}

export default EmptyState;