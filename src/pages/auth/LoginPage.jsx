import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Stack,
} from "@mui/material";

import CustomButton from "../../components/ui/CustomButton";

import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const result = await authService.login({email: form.email, password: form.password,});
      login(result);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Login
          </Typography>

          <TextField
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <CustomButton onClick={handleSubmit}          >
            Login
          </CustomButton>
        </Stack>
      </Paper>
    </Container>
  );
}

export default LoginPage;