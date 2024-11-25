# Role and User Management App with Login

This is a React-based application for role and user management with login authentication. It includes components for user login, role management, and user management, as well as authentication, pagination, and role-based access control.

## Features

- **Login Page**: Users can log in using their email and password.
  - If the user is an admin, they are redirected to the **Admin Dashboard**.
  - If the user is a regular user, they are redirected to the **User Dashboard**.
- **Role Management**: Admin users can manage roles.

  - View, create, edit, and delete roles.
  - Assign permissions to roles.
  - Pagination and search for roles.

- **User Management**: Admin users can manage users.

  - View, create, edit, and delete users.
  - Assign roles and statuses to users.
  - Search users by name or email.
  - Pagination for users.

- **Role Assignment**: Admin can assign roles to users.
- **Status Management**: Users can be marked as "Active" or "Inactive".

## Technologies Used

- **React**: For building the user interface.
- **Material-UI**: For UI components (e.g., tables, buttons, dialogs).
- **JavaScript (ES6)**: Programming language used for the development.
- **CSS**: Custom styling for layout and components.
- **Fetch API**: To interact with the backend API.

## Swagger API Documentation

Swagger is integrated into the backend for easy API documentation and testing. To access the Swagger UI, follow the steps below:

1. Ensure the Backend is Running
   Make sure the backend server is up and running. If not, follow the steps to start it.

2. Access Swagger UI
   Once the backend server is running, navigate to the following URL in your browser:

```bash
http://localhost:5000/api-docs
```

Note: Replace localhost:5000 with your backend server's URL if you're running it on a different host or port.

3. Interact with the API
   Swagger provides a user-friendly interface where you can:

View all available API endpoints.
See detailed information about each endpoint, including request parameters, responses, and data types.
Test the API by making requests directly from the documentation UI. 4. Explore Available Endpoints
Swagger will list all the available endpoints for:

Authentication (Login, Logout)
User management (Create, Update, Delete, View users)
Role management (Create, Update, Delete, View roles)
You can explore each endpoint’s details by clicking on the endpoints and expanding the documentation.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/role-user-management-app.git
```

2. Navigate to the Project Folder

```bash
   cd role-user-management-app
```

3. Install Dependencies

````bash
   npm install
```

4. Configure Environment Variables
   Create a .env file in the root of the project and set the backend URL:

REACT_APP_BACKEND_URL=http://localhost:5000

5. Start the Development Server
```bash
   npm start
```

6. Access the App
   The app will be available at http://localhost:3000.

```bash
role-user-management-app/
├── src/
│   ├── components/
│   │   ├── Login.js               # Login component
│   │   ├── RoleTable.js           # Manages roles
│   │   └── UserTable.js           # Manages users
│   ├── App.js                     # Main app component
│   ├── index.js                   # React entry point
│   └── styles.css                 # Custom styling
├── .env                           # Environment variables
├── package.json                   # Project metadata and dependencies
└── README.md                      # This file
```

UserTable Component
The UserTable component allows users to manage users, including the ability to:

View: Display a list of users with details like name, email, role, and status.
Search: Search users by name or email.
Pagination: Navigate through pages of users.
Create: Add new users with specified roles and statuses.
Edit: Modify existing users, including their roles and statuses.
Delete: Remove users from the system.
Key Features:
Search: Users can search by name or email.
Pagination: Display users in pages for easy navigation.
Dialog for Create/Edit: A dialog box is used to create or edit user details.
Role and Status Assignment: Users can be assigned roles (e.g., Admin, User) and set to Active or Inactive.
Endpoints Used:
GET /api/users: Fetch all users.
POST /api/users: Create a new user.
PUT /api/users/:id: Update an existing user.
DELETE /api/users/:id: Delete a user.
RoleTable Component
The RoleTable component is used to manage user roles and permissions. Admin users can:

View: See a list of roles available in the system.
Create: Add new roles with associated permissions.
Edit: Modify existing roles.
Delete: Remove roles from the system.
Key Features:
Pagination: Display roles in pages for easy navigation.
Search: Users can search roles by name or permissions.
Dialog for Create/Edit: A dialog box is used to create or edit roles.
Endpoints Used:
GET /api/roles: Fetch all roles.
POST /api/roles: Create a new role.
PUT /api/roles/:id: Update an existing role.
DELETE /api/roles/:id: Delete a role.
Login Component
The Login component provides the login functionality for users. It allows users to log in using their email and password.

Key Features:
Email and Password Authentication: Users enter their credentials to authenticate.
Role-based Redirect: Users are redirected based on their role:
Admin users are redirected to the Admin Dashboard.
Regular users are redirected to the User Dashboard.
Error Handling: Displays error messages if the credentials are invalid.
Endpoint Used:
POST /api/auth/login: Sends login credentials and authenticates the user.
Backend API
All components interact with the backend API for user and role management. The following endpoints are used:

Authentication:
POST /api/auth/login: Log in with email and password. Returns user data and role.
Users API:
GET /api/users: Fetch users.
POST /api/users: Create a new user.
PUT /api/users/:id: Update a user.
DELETE /api/users/:id: Delete a user.
Roles API:
GET /api/roles: Fetch roles.
POST /api/roles: Create a new role.
PUT /api/roles/:id: Update a role.
DELETE /api/roles/:id: Delete a role.
Make sure the backend server is set up and accessible through the URL provided in the .env file.

Contributions
Feel free to fork this repository, submit pull requests, or open issues for suggestions or bug fixes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
````
