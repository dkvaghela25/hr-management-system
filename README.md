# 🏢 HR Management System

A modern, role-based HR management application built with React, Vite, and Tailwind CSS. This system enables efficient employee management, leave request handling, and dashboard analytics for different user roles.

---

## ✨ Features

- 🔐 **Role-Based Access Control** - Multi-tier user roles with specific permissions
- 👥 **Employee Management** - Add, view, and manage employee records
- 📋 **Leave Management** - Apply for leaves and manage leave requests
- 📊 **Role-Specific Dashboards** - Customized dashboards for HR, Managers, and Employees
- 🛡️ **Protected Routes** - Secure navigation with role-based route protection
- 🎨 **Responsive Design** - Beautiful UI built with Tailwind CSS
- ⚡ **Fast Development** - Powered by Vite for instant hot module replacement

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **Icons** | React Icons |
| **State Management** | React Context API |

---

## 👥 User Roles & Permissions

### Available Roles:
- **Admin** - Full system access
- **HR** - Employee and leave management
- **Project Manager** - Leave request approval
- **Employee** - Apply for leaves and view personal data

### Permission Matrix:

| Feature | Admin | HR | Manager | Employee |
|---------|-------|----|---------| ---------|
| View Dashboard | ✅ | ✅ | ✅ | ✅ |
| Add Employee | ✅ | ✅ | ❌ | ❌ |
| Edit Employee | ✅ | ✅ | ❌ | ❌ |
| Delete Employee | ✅ | ❌ | ❌ | ❌ |
| Apply Leave | ❌ | ❌ | ❌ | ✅ |
| Approve Leave | ❌ | ❌ | ✅ | ❌ |
| View Salary | ✅ | ✅ | ❌ | Own Only |
| Manage Roles | ✅ | ❌ | ❌ | ❌ |

---

## 🌍 Routes

### Public Routes
- `/login` - User login page

### Protected Routes
- `/` or `/dashboard` - Main dashboard (role-specific)
- `/employees` - Employee list and management
- `/add_employee` - Add new employee (HR only)
- `/leave_requests` - Leave request management (Manager only)
- `/apply_leave` - Apply for leave (Employee only)
- `/take_action` - Action page for leave requests

---

## 📁 Project Structure

```
src/
├── api/                          # API call functions
│   ├── leaveRequests.js
│   └── users.js
├── components/
│   ├── layout/
│   │   └── AppLayout.jsx        # Main app layout with sidebar & navbar
│   └── ui/
│       ├── Navbar.jsx
│       ├── Sidebar.jsx
│       ├── StatCard.jsx
│       └── Dashboard/
│           ├── EmployeeDashboard.jsx
│           ├── HRDashboard.jsx
│           └── ProjectManagerDashboard.jsx
├── contexts/
│   └── userContext.jsx          # User authentication context
├── pages/
│   ├── LoginPage.jsx
│   ├── Dashboard.jsx
│   ├── Employees.jsx
│   ├── AddEmployee.jsx
│   ├── LeaveRequests.jsx
│   ├── ApplyLeave.jsx
│   └── TakeAction.jsx
├── utils/
│   └── ProtectedRoutes.jsx      # Route protection & role-based access
├── App.jsx                       # Main app component with routing
├── main.jsx                      # Application entry point
├── App.css
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hr-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the URL displayed in terminal)

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-----------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🔐 Authentication & Authorization

The application uses:
- **React Context API** for user state management
- **Protected Route Component** to enforce role-based access control
- **User Context** to track current user role and permissions

Protected routes automatically redirect unauthorized users to the login page.

---

## 🎯 Key Components

### AppLayout
Main layout component that includes navigation and sidebar. Provides consistent layout across all protected pages.

### ProtectedRoutes
Custom route component that:
- Checks if user is authenticated
- Validates user role for specific routes
- Redirects to login if not authenticated

### Role-Specific Dashboards
Each role has a customized dashboard:
- **Employee Dashboard** - Personal stats and leave balance
- **HR Dashboard** - Employee metrics and system overview
- **Manager Dashboard** - Leave requests and team metrics

---

## 🔄 State Management

The app uses **React Context API** for:
- User authentication state
- Current user role and permissions
- User information persistence

Located in: `src/contexts/userContext.jsx`

---

## 🎨 Styling

The project uses **Tailwind CSS** for styling with:
- Responsive design system
- Utility-first CSS approach
- Custom color schemes and components
- Mobile-friendly layouts

---

## 📱 Mobile Responsive

The application is fully responsive and works seamlessly on:
- Desktop
- Tablet
- Mobile devices

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Clear node_modules and reinstall:**
```bash
rm -rf node_modules
npm install
```

**Build fails?**
- Ensure you're using Node.js v16 or higher
- Check for TypeScript/ESLint errors: `npm run lint`

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues, questions, or suggestions, please create an issue in the repository or contact the development team.

---

**Version**: 0.0.0  
**Last Updated**: February 2026
