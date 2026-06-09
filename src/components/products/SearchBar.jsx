import { TextField } from "@mui/material";

function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 3 }}
    />
  );
}

export default SearchBar;