import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import "./login.css";

const Login = () => {
  const [value, setValue] = useState("1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const { role } = data.user;

      if (role === "Admin") {
        localStorage.setItem("role", "admin");
        navigate("/admindashboard");
      } else {
        localStorage.setItem("role", "user");
        navigate("/userdashboard", { state: { userData: data } });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://www.example.com/background.jpg')", // optional: set a background image
        backgroundColor: "#f0f4f8", // fallback background color
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderRadius: "8px",
          padding: "2rem",
          backgroundColor: "#ffffff",
          maxWidth: "30rem",
          width: "100%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Typography variant="h3" gutterBottom align="center" color="primary">
            Login to Dashboard
          </Typography>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;
