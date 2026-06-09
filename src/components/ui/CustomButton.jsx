import { Button } from "@mui/material";

function CustomButton({
  children,
  variant = "contained",
  ...props
}) {
  return (
    <Button
      variant={variant}
      size="large"
      sx={{
        borderRadius: 3,
        px: 3,
        py: 1.2,
        fontWeight: 600,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;