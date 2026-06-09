import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel>
          Category
        </InputLabel>

        <Select
          value={selectedCategory}
          label="Category"
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
        >
          <MenuItem value="">
            All Categories
          </MenuItem>

          {categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}

export default ProductFilters;