import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminDashboard from "./components/adminDashboard";
import Login from "./components/login";
import ProtectedRoute from "./components/protectedRoute"; // Import ProtectedRoute
import UserDashboard from "./components/userDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/userdashboard",
    element: (
      <ProtectedRoute requiredRole="user">
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admindashboard",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect to Login page
  },
]);
