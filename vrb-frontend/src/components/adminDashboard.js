import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import RoleTable from "./roleTable";
import UserTable from "./userTable";

const AdminDashboard = () => {
  const [value, setValue] = useState("1");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/roles`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const formattedRoles = data.map((role) => ({
        id: role._id,
        roleName: role.rolename,
        permissions: Object.keys(role.permissions).filter(
          (perm) => role.permissions[perm]
        ),
      }));

      setRoles(formattedRoles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handlelogout = () => {
    // console.log("logout");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Button variant="contained" color="primary" onClick={handlelogout}>
          LogOut
        </Button>
      </div>
      <Box sx={{ width: "80%", typography: "body1", margin: "5rem auto" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="User Management" value="1" />
              <Tab label="Role Management" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UserTable roles={roles} />
          </TabPanel>
          <TabPanel value="2">
            <RoleTable roles={roles} setRoles={setRoles} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default AdminDashboard;
