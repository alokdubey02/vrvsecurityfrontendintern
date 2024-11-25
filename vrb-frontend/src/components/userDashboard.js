import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"; // for navigation

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {}; // Get the userData passed via state

  // Redirect to login if userData is not available
  if (!userData) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Redirect to the home page
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f4f6f8" }}>
      {/* LogOut Button */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          LogOut
        </Button>
      </Box>

      {/* Main User Info with Cards in Two Rows */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: "3rem",
        }}
      >
        {/* Welcome Card */}
        <Card
          sx={{ boxShadow: 3, backgroundColor: "#e3f2fd", borderRadius: 2 }}
        >
          <CardContent>
            <Typography variant="h3" gutterBottom color="primary">
              Welcome, {userData.user.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Email: {userData.user.email}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Role: {userData.user.role}
            </Typography>
          </CardContent>
        </Card>

        {/* Second Row: Permissions and Status */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Permissions Card */}
          <Card
            sx={{
              boxShadow: 3,
              backgroundColor: "#e8f5e9",
              borderRadius: 2,
              width: "48%",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                Permissions:
              </Typography>
              <ul>
                {userData.user.permissions.map((permission, index) => (
                  <li key={index}>
                    <Typography variant="body1">{permission}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card
            sx={{
              boxShadow: 3,
              backgroundColor: "#fff3e0",
              borderRadius: 2,
              width: "48%",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                Account Status:
              </Typography>
              <Typography variant="body1" color="text.primary">
                {userData.user.status}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default UserDashboard;
