# CRM Application

A full-stack CRM (Customer Relationship Management) application built with Node.js and Next.js.

## 📁 Project Structure

```
CRM Project/
├── backend/                    # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── app.js             # Express app configuration
│   │   ├── server.js          # Server entry point
│   │   ├── routes.js          # Main routes file
│   │   ├── config/            # Configuration files
│   │   │   ├── db.js          # Database configuration
│   │   │   └── jwt.js         # JWT configuration
│   │   ├── controllers/       # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── usersController.js
│   │   │   ├── projectsController.js
│   │   │   ├── tasksController.js
│   │   │   ├── salesController.js
│   │   │   ├── departmentsController.js
│   │   │   ├── rolesController.js
│   │   │   ├── permissionsController.js
│   │   │   ├── attendanceController.js
│   │   │   ├── eodController.js
│   │   │   ├── attachmentsController.js
│   │   │   └── uploadsController.js
│   │   ├── middlewares/       # Custom middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── authenticateJWT.js
│   │   │   └── permission.middleware.js
│   │   ├── models/            # Database models
│   │   │   ├── db.js
│   │   │   └── init.js
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/
│   │   │   └── permissions/
│   │   └── routes/            # Route definitions
│   │       ├── auth.routes.js
│   │       ├── users.js
│   │       ├── projects.js
│   │       ├── tasks.js
│   │       ├── sales.js
│   │       ├── departments.js
│   │       ├── roles.js
│   │       ├── permissions.js
│   │       ├── attendance.js
│   │       ├── eods.js
│   │       ├── attachments.js
│   │       └── uploads.js
│   ├── database/              # Database related files
│   ├── crm.sqlite             # SQLite database file
│   ├── seed.sql               # Database seed data
│   ├── roles_permissions.txt  # Roles and permissions documentation
│   └── package.json           # Backend dependencies
│
├── frontend/                   # Frontend application (Next.js + TypeScript)
│   ├── app/                   # Next.js app directory
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── (app)/             # Authenticated app routes
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/     # Dashboard page
│   │   │   ├── users/         # User management
│   │   │   ├── projects/      # Project management
│   │   │   ├── tasks/         # Task management
│   │   │   ├── sales/         # Sales management
│   │   │   ├── leads/         # Lead management
│   │   │   ├── departments/   # Department management
│   │   │   ├── roles/         # Role management
│   │   │   ├── attendance/    # Attendance tracking
│   │   │   ├── eod-reports/   # End of day reports
│   │   │   ├── leaves/        # Leave management
│   │   │   ├── data-upload/   # Data upload feature
│   │   │   └── settings/      # Settings page
│   │   └── (auth)/            # Authentication routes
│   │       └── login/         # Login page
│   ├── components/            # React components
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   └── sidebar.tsx
│   │   ├── dashboard/
│   │   │   ├── metric-card.tsx
│   │   │   └── recent-activity.tsx
│   │   ├── users/
│   │   │   └── user-dialog.tsx
│   │   ├── projects/
│   │   │   └── project-dialog.tsx
│   │   ├── tasks/
│   │   │   └── task-dialog.tsx
│   │   ├── sales/
│   │   │   └── sale-dialog.tsx
│   │   ├── leads/
│   │   │   └── lead-dialog.tsx
│   │   ├── departments/
│   │   │   └── department-dialog.tsx
│   │   ├── roles/
│   │   │   └── role-dialog.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── checkbox.tsx
│   │       ├── table.tsx
│   │       └── data-table.tsx
│   ├── lib/                   # Utilities and helpers
│   │   ├── utils.ts
│   │   ├── context/
│   │   │   └── auth-context.tsx
│   │   ├── hooks/
│   │   │   ├── use-api.ts
│   │   │   ├── use-permissions.ts
│   │   │   └── use-protected-route.ts
│   │   ├── services/
│   │   │   ├── api-service.ts
│   │   │   ├── middleware.tsx
│   │   │   └── mock-service.ts
│   │   └── types/
│   │       └── api.ts
│   ├── public/                # Static files
│   ├── styles/                # Additional styles
│   │   └── globals.css
│   ├── components.json        # shadcn/ui configuration
│   ├── next.config.mjs        # Next.js configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── postcss.config.mjs     # PostCSS configuration
│   ├── package.json           # Frontend dependencies
│   └── pnpm-lock.yaml         # pnpm lock file
│
├── .gitignore                 # Git ignore file
├── package.json               # Root package.json for scripts
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- SQLite3

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "CRM Project"
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install:all
   ```

   Or install separately:
   ```bash
   # Backend
   npm run install:backend
   
   # Frontend
   npm run install:frontend
   ```

3. **Set up environment variables**
   
   Backend (.env in backend folder):
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   DATABASE_PATH=./crm.sqlite
   ```
   
   Frontend (.env.local in frontend folder):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Initialize the database**
   ```bash
   cd backend
   npm run seed  # If you have a seed script
   ```

### Running the Application

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Run separately:**
```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📋 Features

- **User Management**: Create, update, and manage users with role-based access control
- **Project Management**: Track and manage projects
- **Task Management**: Assign and monitor tasks
- **Sales & Leads**: Manage sales pipeline and leads
- **Department Management**: Organize teams and departments
- **Role & Permission System**: Fine-grained access control
- **Attendance Tracking**: Monitor employee attendance
- **EOD Reports**: End of day reporting system
- **Data Upload**: Bulk data import functionality
- **Authentication**: Secure JWT-based authentication

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- SQLite3
- JWT for authentication
- Middleware for permissions

### Frontend
- Next.js 14 (App Router)
- TypeScript
- React
- shadcn/ui components
- Tailwind CSS

## 📝 API Documentation

API endpoints are organized by feature:

- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/projects` - Project management
- `/api/tasks` - Task management
- `/api/sales` - Sales management
- `/api/leads` - Lead management
- `/api/departments` - Department management
- `/api/roles` - Role management
- `/api/permissions` - Permission management
- `/api/attendance` - Attendance tracking
- `/api/eods` - EOD reports
- `/api/uploads` - File uploads

## 🔒 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Permission middleware for route protection
- Secure password handling

## 📦 Database

The application uses SQLite3 for data storage. The database file (`crm.sqlite`) is automatically created when you run the application for the first time.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email [your-email@example.com] or create an issue in the repository.
