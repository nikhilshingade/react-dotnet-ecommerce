import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import CustomButton from "../../components/ui/CustomButton";

import productService from "../../services/productService";
import categoryService from "../../services/categoryService";

function CreateProductPage() {
  const navigate = useNavigate();

  const [categories, setCategories] =
    useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data =
        await categoryService.getAll();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await productService.create({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
      });

      alert("Product Created");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 5 }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
        >
          Create Product
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <TextField
            label="Stock"
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({
                ...form,
                stock: e.target.value,
              })
            }
          />

          <TextField
            select
            label="Category"
            value={form.categoryId}
            onChange={(e) =>
              setForm({
                ...form,
                categoryId:
                  e.target.value,
              })
            }
          >
            {categories.map(
              (category) => (
                <MenuItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </MenuItem>
              )
            )}
          </TextField>

          <TextField
            label="Image URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({
                ...form,
                imageUrl:
                  e.target.value,
              })
            }
          />

          <CustomButton
            onClick={handleSubmit}
          >
            Create Product
          </CustomButton>
        </Stack>
      </Paper>
    </Container>
  );
}

export default CreateProductPage;