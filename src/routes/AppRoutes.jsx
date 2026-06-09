import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/customer/HomePage";
import ProductDetailPage from "../pages/customer/ProductDetailPage";
import LoginPage from "../pages/auth/LoginPage";
import CartPage from "../pages/customer/CartPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../pages/auth/RegisterPage";
import OrdersPage from "../pages/customer/OrdersPage";
import AdminRoute from "./AdminRoute";
import AdminProducts from "../pages/admin/AdminProducts";
import CreateProductPage from "../pages/admin/CreateProductPage";
import EditProductPage from "../pages/admin/EditProductPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/product/:id" element={<ProductDetailPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products/create"
        element={
          <AdminRoute>
            <CreateProductPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/edit/:id"
        element={
          <AdminRoute>
            <EditProductPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
