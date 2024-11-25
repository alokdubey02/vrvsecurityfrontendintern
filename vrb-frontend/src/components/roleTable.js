import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

// Permissions list
const permissionsList = ["read", "write", "delete"];

const RoleTable = ({ roles, setRoles }) => {
  // console.log(roles);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editRole, setEditRole] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Filtered roles based on search term
  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Search handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page on search
  };

  // Open Edit Dialog
  const handleEdit = (role) => {
    setEditRole({ ...role });
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  // Open Create Dialog
  const handleCreateNewRole = () => {
    setEditRole({ roleName: "", permissions: [] });
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  // Handle Close Dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditRole(null);
    setIsCreating(false);
  };

  // Handle Save Changes (for create or edit)
  const allPermissions = ["read", "write", "delete"];
  const handleSaveChanges = async () => {
    if (isCreating) {
      // Call API to create new role
      const newRole = { ...editRole };
      try {
        // console.log(newRole);
        // Initialize the permissions object with all set to false
        const permissionsObject = {};
        allPermissions.forEach((permission) => {
          permissionsObject[permission] =
            newRole.permissions.includes(permission);
        });
        const roleData = {
          rolename: newRole.roleName,
          permissions: permissionsObject,
        };
        // console.log(roleData);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/roles`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(roleData),
          }
        );
        if (response.ok) {
          const createdRole = await response.json();
          const permissionsObject = createdRole.permissions;

          // Convert the permissions object to an array of keys with true values
          const permissionsArray = Object.keys(permissionsObject).filter(
            (key) => permissionsObject[key] === true
          );
          const upd = {
            roleName: createdRole.rolename,
            id: createdRole._id,
            permissions: permissionsArray,
          };
          // console.log(upd);
          setRoles((prevRoles) => [...prevRoles, upd]);
        } else {
          console.error("Failed to create role");
        }
      } catch (error) {
        console.error("Error creating role:", error);
      }
    } else {
      // Call API to update existing role
      const updatedRole = { ...editRole };
      try {
        // Initialize the permissions object with all set to false
        const permissionsObject = {};
        allPermissions.forEach((permission) => {
          permissionsObject[permission] =
            updatedRole.permissions.includes(permission);
        });

        // Create the role data object with updated permissions
        const roleData = {
          rolename: updatedRole.roleName,
          permissions: permissionsObject,
        };
        // console.log(roleData);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/roles/${editRole.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(roleData),
          }
        );
        if (response.ok) {
          const updatedRoleData = await response.json();
          const permissionsObject = updatedRoleData.permissions;

          // Convert the permissions object to an array of keys with true values
          const permissionsArray = Object.keys(permissionsObject).filter(
            (key) => permissionsObject[key] === true
          );
          const upd = {
            roleName: updatedRoleData.rolename,
            id: updatedRoleData._id,
            permissions: permissionsArray,
          };
          setRoles((prevRoles) =>
            prevRoles.map((role) =>
              role.id === updatedRoleData._id ? upd : role
            )
          );
        } else {
          console.error("Failed to update role");
        }
      } catch (error) {
        console.error("Error updating role:", error);
      }
    }
    handleCloseDialog();
  };

  // Handle Delete
  const handleDelete = async (roleId) => {
    try {
      // console.log(roleId);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/roles/${roleId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setRoles(roles.filter((role) => role.id !== roleId));
      } else {
        console.error("Failed to delete role");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // Handle Change in Edit Form
  const handleEditChange = (field, value) => {
    setEditRole((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Permission Toggle
  const handlePermissionToggle = (permission) => {
    setEditRole((prev) => {
      const permissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions };
    });
  };

  return (
    <Box>
      {/* Search Field and Create Button */}
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <TextField
          label="Search by Role Name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewRole}
        >
          Add Role
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "wheat" }}>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRoles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>
                    {permissionsList.map((permission) => (
                      <Checkbox
                        key={permission}
                        checked={role.permissions.includes(permission)}
                        disabled // Permissions are read-only in the table view
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(role)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(role.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {filteredRoles.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No roles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRoles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit/Create Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{isCreating ? "Add Role" : "Edit Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            value={editRole?.roleName || ""}
            fullWidth
            margin="normal"
            onChange={(e) => handleEditChange("roleName", e.target.value)}
          />
          <Box marginTop={2}>
            <label>Permissions:</label>
            <Box>
              {permissionsList.map((permission) => (
                <Box key={permission} display="inline-block" marginRight={2}>
                  <Checkbox
                    checked={editRole?.permissions.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                  />
                  {permission}
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleTable;
