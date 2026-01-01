// API Request/Response Types based on specifications

// Authentication
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  designation: string
  department_id: string
  role_id: string
  profile_picture: string | null
  created_at: string
  updated_at: string
}

// Dashboard
export interface DashboardMetrics {
  total_users: number
  total_departments: number
  total_sales: number
  total_leads: number
  total_projects: number
  total_tasks: number
  attendance_rate: number
  recent_activities: Activity[]
}

export interface Activity {
  id: string
  user_id: string
  action: string
  description: string
  timestamp: string
}

// Users
export interface CreateUserRequest {
  name: string
  email: string
  phone: string
  designation: string
  department_id: string
  role_id: string
  password: string
}

export interface UpdateUserRequest {
  name?: string
  phone?: string
  designation?: string
  department_id?: string
  role_id?: string
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

// Departments
export interface Department {
  id: string
  name: string
  description: string
  head_id: string
  created_at: string
  updated_at: string
}

export interface CreateDepartmentRequest {
  name: string
  description: string
  head_id: string
}

export interface UpdateDepartmentRequest {
  name?: string
  description?: string
  head_id?: string
}

// Roles & Permissions
export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  created_at: string
  updated_at: string
}

export interface Permission {
  id: string
  name: string
  description: string
  module: string
  created_at: string
}

export interface CreateRoleRequest {
  name: string
  description: string
  permissions: string[]
}

export interface UpdateRoleRequest {
  name?: string
  description?: string
  permissions?: string[]
}

// Sales
export interface Sale {
  id: string
  title: string
  description: string
  amount: number
  status: "pending" | "in_progress" | "completed" | "cancelled"
  user_id: string
  created_at: string
  updated_at: string
}

export interface CreateSaleRequest {
  title: string
  description: string
  amount: number
  status: string
}

export interface UpdateSaleRequest {
  title?: string
  description?: string
  amount?: number
  status?: string
}

// Leads
export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  source: string
  assigned_to: string
  created_at: string
  updated_at: string
}

export interface CreateLeadRequest {
  name: string
  email: string
  phone: string
  company: string
  status: string
  source: string
  assigned_to: string
}

export interface UpdateLeadRequest {
  name?: string
  email?: string
  phone?: string
  company?: string
  status?: string
  source?: string
  assigned_to?: string
}

// Projects
export interface Project {
  id: string
  name: string
  description: string
  status: "planning" | "in_progress" | "on_hold" | "completed" | "cancelled"
  start_date: string
  end_date: string
  manager_id: string
  created_at: string
  updated_at: string
}

export interface CreateProjectRequest {
  name: string
  description: string
  status: string
  start_date: string
  end_date: string
  manager_id: string
}

export interface UpdateProjectRequest {
  name?: string
  description?: string
  status?: string
  start_date?: string
  end_date?: string
  manager_id?: string
}

// Tasks
export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in_progress" | "in_review" | "completed" | "blocked"
  priority: "low" | "medium" | "high" | "critical"
  project_id: string
  assigned_to: string
  due_date: string
  created_at: string
  updated_at: string
}

export interface CreateTaskRequest {
  title: string
  description: string
  status: string
  priority: string
  project_id: string
  assigned_to: string
  due_date: string
}

export interface UpdateTaskRequest {
  title?: string
  description?: string
  status?: string
  priority?: string
  project_id?: string
  assigned_to?: string
  due_date?: string
}

// Attendance
export interface AttendanceRecord {
  id: string
  user_id: string
  date: string
  status: "present" | "absent" | "half_day" | "on_leave"
  check_in_time: string | null
  check_out_time: string | null
  created_at: string
  updated_at: string
}

export interface CreateAttendanceRequest {
  user_id: string
  date: string
  status: string
  check_in_time?: string
  check_out_time?: string
}

export interface UpdateAttendanceRequest {
  status?: string
  check_in_time?: string
  check_out_time?: string
}

// Leaves
export interface LeaveRequest {
  id: string
  user_id: string
  start_date: string
  end_date: string
  reason: string
  status: "pending" | "approved" | "rejected"
  leave_type: "annual" | "sick" | "personal" | "other"
  created_at: string
  updated_at: string
}

export interface CreateLeaveRequest {
  user_id: string
  start_date: string
  end_date: string
  reason: string
  leave_type: string
}

export interface UpdateLeaveRequest {
  status?: string
}

// EOD Reports
export interface EODReport {
  id: string
  user_id: string
  date: string
  content: string
  tasks_completed: number
  tasks_pending: number
  blockers: string
  created_at: string
  updated_at: string
}

export interface CreateEODReportRequest {
  user_id: string
  date: string
  content: string
  tasks_completed: number
  tasks_pending: number
  blockers: string
}

export interface UpdateEODReportRequest {
  content?: string
  tasks_completed?: number
  tasks_pending?: number
  blockers?: string
}

// Data Upload
export interface DataUpload {
  id: string
  user_id: string
  file_name: string
  file_url: string
  file_type: string
  uploaded_at: string
  status: "processing" | "completed" | "failed"
  error_message?: string
}

export interface CreateDataUploadRequest {
  file: File
  file_type: string
}

// Settings
export interface Settings {
  id: string
  key: string
  value: string
  updated_at: string
}

export interface UpdateSettingsRequest {
  [key: string]: string
}

// Permissions for UI rendering
export interface PermissionSet {
  canViewDashboard: boolean
  canManageUsers: boolean
  canManageDepartments: boolean
  canManageRoles: boolean
  canManageSales: boolean
  canManageLeads: boolean
  canManageProjects: boolean
  canManageTasks: boolean
  canViewAttendance: boolean
  canManageLeaves: boolean
  canViewEODReports: boolean
  canUploadData: boolean
  canManageSettings: boolean
}
