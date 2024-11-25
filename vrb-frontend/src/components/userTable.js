import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const UserTable = ({ roles }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editUser, setEditUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  //
  const [isFormValid, setIsFormValid] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  //
  useEffect(() => {
    const isValid =
      editUser?.name?.trim() &&
      emailRegex.test(editUser?.email || "") &&
      editUser?.role &&
      editUser?.status &&
      editUser?.password;
    setIsFormValid(isValid);
  }, [editUser]);
  //

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleCreateNewUser = () => {
    setEditUser({
      name: "",
      email: "",
      role: "",
      status: "Active",
      password: "",
    });
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditUser(null);
    setIsCreating(false);
  };

  const handleSaveChanges = async () => {
    const { name, email, role, status, password } = editUser || {};
    const userPayload = { name, email, role, status, password };

    if (isCreating) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPayload),
          }
        );
        if (!response.ok) throw new Error("Failed to create user.");
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    } else {
      try {
        userPayload.password = "";
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${editUser._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPayload),
          }
        );
        if (!response.ok) throw new Error("Failed to update user.");
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
    handleCloseDialog();
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete user.");
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditChange = (field, value) => {
    setEditUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom={3}>
        <TextField
          label="Search by Name or Email"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "60%" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewUser}
          sx={{
            backgroundColor: "#3f51b5",
            "&:hover": { backgroundColor: "#303f9f" },
            textTransform: "capitalize",
            borderRadius: "5px",
          }}
        >
          Create New User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "wheat" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(user)}
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ fontStyle: "italic" }}
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)}
      />

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        sx={{ "& .MuiDialog-paper": { borderRadius: "8px" } }}
      >
        <DialogTitle sx={{ backgroundColor: "#3f51b5", color: "white" }}>
          {isCreating ? "Create New User" : "Edit User"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editUser?.name || ""}
            fullWidth
            margin="normal"
            onChange={(e) => handleEditChange("name", e.target.value)}
          />
          <TextField
            label="Email"
            value={editUser?.email || ""}
            fullWidth
            margin="normal"
            onChange={(e) => handleEditChange("email", e.target.value)}
          />
          <Box marginTop={2}>
            <label>Role:</label>
            <Select
              value={editUser?.role || ""}
              onChange={(e) => handleEditChange("role", e.target.value)}
              fullWidth
              margin="normal"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.roleName}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box marginTop={2}>
            <label>Status:</label>
            <Select
              value={editUser?.status || "Active"}
              onChange={(e) => handleEditChange("status", e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Box>
          {isCreating && (
            <TextField
              label="Password"
              type="password"
              value={editUser?.password || ""}
              fullWidth
              required
              margin="normal"
              onChange={(e) => handleEditChange("password", e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            color="primary"
            variant="contained"
            disabled={!isFormValid}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
