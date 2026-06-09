import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  const loadProduct = async () => {
    try {
        const data = await productService.getById(id);
        setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl || "",
        });
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };
  useEffect(() => {
    if (id) {
        loadCategories();
        loadProduct();
    }
  }, [id]);

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
      await productService.update(id,
        {
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
            categoryId: Number(form.categoryId),
        }
        );
      alert("Product Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
        <Container sx={{ py: 5 }}>
        Loading...
        </Container>
    );
  }

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
          Edit Product
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
          {form.imageUrl && (
            <img
                src={form.imageUrl}
                alt="Preview"
                style={{
                width: "100%",
                maxHeight: "250px",
                objectFit: "cover",
                borderRadius: "12px",
                }}
            />
            )}

          <CustomButton
            onClick={handleSubmit}
          >
            Update Product
          </CustomButton>
        </Stack>
      </Paper>
    </Container>
  );
}

export default EditProductPage;