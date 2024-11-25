import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRole, children }) => {
  const role = localStorage.getItem("role");

  // If no role is found, redirect to the login page
  if (!role) {
    return <Navigate to="/" />;
  }

  // Check if the role matches the required one, otherwise redirect to the appropriate dashboard
  if (role !== requiredRole) {
    return <Navigate to={`/${role}dashboard`} />;
  }

  // If role matches, render the requested page (via Outlet)
  return children;
};

export default ProtectedRoute;
