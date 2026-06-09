import { Box, Typography } from "@mui/material";

function PageHeader({
  title,
  subtitle,
}) {
  return (
    <Box mb={4}>
      <Typography
        variant="h3"
        fontWeight={700}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default PageHeader;