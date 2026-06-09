import { Typography } from "@mui/material";

function SectionTitle({ title }) {
  return (
    <Typography
      variant="h4"
      fontWeight={700}
      mb={3}
    >
      {title}
    </Typography>
  );
}

export default SectionTitle;