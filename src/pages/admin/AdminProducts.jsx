import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import productService from "../../services/productService";

function AdminProducts() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
    loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data =
            await productService.getAll();

            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;
        try {
            await productService.delete(id);
            loadProducts();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container  sx={{ py: 5,width:"100%" }} >
            <Stack sx={{display:"flex",alignItems:"center",flexDirection:"row",marginBottom:"10px",width:"100%",justifyContent:"space-between"}}>
                <Typography  variant="h4" fontWeight={700}>
                    Product Management
                </Typography>
                <Button  variant="contained" onClick={() => navigate("/admin/products/create")}>
                    Add Product
                </Button>
            </Stack>

            <Paper>
                <TableContainer sx={{overflowX: "auto",}}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>
                            Name
                            </TableCell>

                            <TableCell>
                            Category
                            </TableCell>

                            <TableCell>
                            Price
                            </TableCell>

                            <TableCell>
                            Stock
                            </TableCell>

                            <TableCell>
                            Actions
                            </TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    {product.name}
                                </TableCell>

                                <TableCell>
                                {
                                    product.categoryName
                                }
                                </TableCell>

                                <TableCell>
                                    ₹{product.price.toLocaleString()}
                                </TableCell>

                                <TableCell>
                                    {product.stock}
                                </TableCell>

                                <TableCell>
                                <IconButton
                                    color="primary"
                                    onClick={() =>
                                    navigate(
                                        `/admin/products/edit/${product.id}`
                                    )
                                    }
                                >
                                    <EditIcon />
                                </IconButton>

                                <IconButton
                                    color="error"
                                    onClick={() =>
                                    handleDelete(
                                        product.id
                                    )
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                                </TableCell>
                            </TableRow>
                            )
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
  
}

export default AdminProducts;