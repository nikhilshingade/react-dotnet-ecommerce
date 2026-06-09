import {
  Box,
  CircularProgress,
} from "@mui/material";

function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      py={6}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;