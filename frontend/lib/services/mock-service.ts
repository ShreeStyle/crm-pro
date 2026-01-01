// Mock service for development - easily removable when backend is live
import type {
  LoginResponse,
  DashboardMetrics,
  UserListResponse,
  User,
  Department,
  Role,
  Permission,
  Sale,
  Lead,
  Project,
  Task,
  AttendanceRecord,
  LeaveRequest,
  EODReport,
} from "@/lib/types/api"

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0101",
    designation: "Manager",
    department_id: "1",
    role_id: "1",
    profile_picture: null,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0102",
    designation: "Developer",
    department_id: "2",
    role_id: "2",
    profile_picture: null,
    created_at: "2024-01-02",
    updated_at: "2024-01-02",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1-555-0103",
    designation: "Designer",
    department_id: "3",
    role_id: "2",
    profile_picture: null,
    created_at: "2024-01-03",
    updated_at: "2024-01-03",
  },
]

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Sales",
    description: "Sales department",
    head_id: "1",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "2",
    name: "Engineering",
    description: "Engineering department",
    head_id: "2",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "3",
    name: "Design",
    description: "Design department",
    head_id: "3",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
]

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Administrator with full access",
    permissions: ["all"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "2",
    name: "User",
    description: "Regular user with limited access",
    permissions: ["view_dashboard", "view_tasks", "manage_own_tasks"],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
]

const mockPermissions: Permission[] = [
  { id: "1", name: "view_dashboard", description: "View dashboard", module: "dashboard", created_at: "2024-01-01" },
  { id: "2", name: "manage_users", description: "Manage users", module: "users", created_at: "2024-01-01" },
  {
    id: "3",
    name: "manage_departments",
    description: "Manage departments",
    module: "departments",
    created_at: "2024-01-01",
  },
  { id: "4", name: "manage_roles", description: "Manage roles", module: "roles", created_at: "2024-01-01" },
  { id: "5", name: "manage_sales", description: "Manage sales", module: "sales", created_at: "2024-01-01" },
  { id: "6", name: "manage_leads", description: "Manage leads", module: "leads", created_at: "2024-01-01" },
  { id: "7", name: "manage_projects", description: "Manage projects", module: "projects", created_at: "2024-01-01" },
  { id: "8", name: "manage_tasks", description: "Manage tasks", module: "tasks", created_at: "2024-01-01" },
  { id: "9", name: "view_attendance", description: "View attendance", module: "attendance", created_at: "2024-01-01" },
  { id: "10", name: "manage_leaves", description: "Manage leaves", module: "leaves", created_at: "2024-01-01" },
  {
    id: "11",
    name: "view_eod_reports",
    description: "View EOD reports",
    module: "eod_reports",
    created_at: "2024-01-01",
  },
  { id: "12", name: "upload_data", description: "Upload data", module: "data_upload", created_at: "2024-01-01" },
  { id: "13", name: "manage_settings", description: "Manage settings", module: "settings", created_at: "2024-01-01" },
]

const mockSales: Sale[] = [
  {
    id: "1",
    title: "Enterprise Deal",
    description: "Large enterprise contract",
    amount: 50000,
    status: "in_progress",
    user_id: "1",
    created_at: "2024-01-10",
    updated_at: "2024-01-10",
  },
  {
    id: "2",
    title: "SMB Contract",
    description: "Small business contract",
    amount: 10000,
    status: "pending",
    user_id: "1",
    created_at: "2024-01-11",
    updated_at: "2024-01-11",
  },
]

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Alice Cooper",
    email: "alice@company.com",
    phone: "+1-555-0201",
    company: "Tech Corp",
    status: "qualified",
    source: "website",
    assigned_to: "1",
    created_at: "2024-01-05",
    updated_at: "2024-01-05",
  },
  {
    id: "2",
    name: "Bob Wilson",
    email: "bob@startup.com",
    phone: "+1-555-0202",
    company: "StartUp Inc",
    status: "new",
    source: "referral",
    assigned_to: "1",
    created_at: "2024-01-06",
    updated_at: "2024-01-06",
  },
]

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Mobile App Redesign",
    description: "Complete redesign of mobile app",
    status: "in_progress",
    start_date: "2024-01-01",
    end_date: "2024-03-01",
    manager_id: "2",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "2",
    name: "Backend API",
    description: "New REST API development",
    status: "planning",
    start_date: "2024-02-01",
    end_date: "2024-04-01",
    manager_id: "2",
    created_at: "2024-01-02",
    updated_at: "2024-01-02",
  },
]

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design landing page",
    description: "Create new landing page design",
    status: "in_progress",
    priority: "high",
    project_id: "1",
    assigned_to: "3",
    due_date: "2024-01-20",
    created_at: "2024-01-10",
    updated_at: "2024-01-10",
  },
  {
    id: "2",
    title: "Write API documentation",
    description: "Document all API endpoints",
    status: "todo",
    priority: "medium",
    project_id: "2",
    assigned_to: "2",
    due_date: "2024-02-15",
    created_at: "2024-01-11",
    updated_at: "2024-01-11",
  },
]

const mockAttendance: AttendanceRecord[] = [
  {
    id: "1",
    user_id: "1",
    date: "2024-01-15",
    status: "present",
    check_in_time: "09:00",
    check_out_time: "17:00",
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: "2",
    user_id: "2",
    date: "2024-01-15",
    status: "present",
    check_in_time: "09:15",
    check_out_time: "17:30",
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
]

const mockLeaves: LeaveRequest[] = [
  {
    id: "1",
    user_id: "1",
    start_date: "2024-02-01",
    end_date: "2024-02-05",
    reason: "Annual vacation",
    status: "approved",
    leave_type: "annual",
    created_at: "2024-01-10",
    updated_at: "2024-01-10",
  },
]

const mockEODReports: EODReport[] = [
  {
    id: "1",
    user_id: "1",
    date: "2024-01-15",
    content: "Completed design review and started prototyping",
    tasks_completed: 3,
    tasks_pending: 2,
    blockers: "Waiting for backend API",
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
]

export const mockService = {
  // Mock login - returns admin user
  mockLogin: (): LoginResponse => ({
    token: "mock-jwt-token-" + Date.now(),
    user: {
      ...mockUsers[0],
      role_id: "1", // Admin role
    },
  }),

  mockGetDashboardMetrics: (): DashboardMetrics => ({
    total_users: mockUsers.length,
    total_departments: mockDepartments.length,
    total_sales: mockSales.length,
    total_leads: mockLeads.length,
    total_projects: mockProjects.length,
    total_tasks: mockTasks.length,
    attendance_rate: 92,
    recent_activities: [
      {
        id: "1",
        user_id: "1",
        action: "completed_task",
        description: "John completed task: Design landing page",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        user_id: "2",
        action: "created_project",
        description: "Jane created new project: Backend API",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
  }),

  mockGetUsers: (): UserListResponse => ({
    users: mockUsers,
    total: mockUsers.length,
    page: 1,
    limit: 10,
  }),

  mockGetDepartments: () => mockDepartments,
  mockGetRoles: () => mockRoles,
  mockGetPermissions: () => mockPermissions,
  mockGetSales: () => ({ items: mockSales, total: mockSales.length }),
  mockGetLeads: () => ({ items: mockLeads, total: mockLeads.length }),
  mockGetProjects: () => ({ items: mockProjects, total: mockProjects.length }),
  mockGetTasks: () => ({ items: mockTasks, total: mockTasks.length }),
  mockGetAttendance: () => mockAttendance,
  mockGetLeaves: () => ({ items: mockLeaves, total: mockLeaves.length }),
  mockGetEODReports: () => ({ items: mockEODReports, total: mockEODReports.length }),
}
