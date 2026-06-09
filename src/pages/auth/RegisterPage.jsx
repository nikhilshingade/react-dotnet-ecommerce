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

function RegisterPage() {
  const navigate = useNavigate();
  const [loading,setloading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      setloading(true);
      await authService.register(form);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
    finally{
      setloading(false)
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Create Account
          </Typography>

          <TextField
            label="Full Name"
            fullWidth
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

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

          <CustomButton
            onClick={handleSubmit}
          >
            {loading?"Creating Account..":"Register"}
          </CustomButton>
        </Stack>
      </Paper>
    </Container>
  );
}

export default RegisterPage;