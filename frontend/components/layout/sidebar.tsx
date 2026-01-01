"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"
import { usePermissions } from "@/lib/hooks/use-permissions"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Building2,
  Lock,
  TrendingUp,
  Zap,
  Briefcase,
  CheckSquare,
  Calendar,
  ClipboardList,
  FileUp,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  permission?: keyof ReturnType<typeof usePermissions>
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    permission: "canViewDashboard",
  },
  {
    label: "Users",
    href: "/users",
    icon: <Users className="w-5 h-5" />,
    permission: "canManageUsers",
  },
  {
    label: "Departments",
    href: "/departments",
    icon: <Building2 className="w-5 h-5" />,
    permission: "canManageDepartments",
  },
  {
    label: "Roles & Permissions",
    href: "/roles",
    icon: <Lock className="w-5 h-5" />,
    permission: "canManageRoles",
  },
  {
    label: "Sales",
    href: "/sales",
    icon: <TrendingUp className="w-5 h-5" />,
    permission: "canManageSales",
  },
  {
    label: "Leads",
    href: "/leads",
    icon: <Zap className="w-5 h-5" />,
    permission: "canManageLeads",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <Briefcase className="w-5 h-5" />,
    permission: "canManageProjects",
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: <CheckSquare className="w-5 h-5" />,
    permission: "canManageTasks",
  },
  {
    label: "Attendance",
    href: "/attendance",
    icon: <Calendar className="w-5 h-5" />,
    permission: "canViewAttendance",
  },
  {
    label: "Leaves",
    href: "/leaves",
    icon: <Calendar className="w-5 h-5" />,
    permission: "canManageLeaves",
  },
  {
    label: "EOD Reports",
    href: "/eod-reports",
    icon: <ClipboardList className="w-5 h-5" />,
    permission: "canViewEODReports",
  },
  {
    label: "Data Upload",
    href: "/data-upload",
    icon: <FileUp className="w-5 h-5" />,
    permission: "canUploadData",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
    permission: "canManageSettings",
  },
]

export function Sidebar() {
  const [open, setOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const permissions = usePermissions()

  const visibleItems = navItems.filter((item) => !item.permission || permissions[item.permission as any])

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 hover:bg-accent rounded-md"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar backdrop for mobile */}
      {mobileOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
          "md:relative md:block",
          open ? "w-64" : "w-20",
          mobileOpen ? "block" : "hidden md:block",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            <div className={cn("font-bold text-sidebar-foreground", open ? "text-lg" : "hidden")}>CRM</div>
            <button
              onClick={() => setOpen(!open)}
              className="hidden md:p-1 md:hover:bg-sidebar-accent rounded-md md:flex"
            >
              <ChevronDown className={cn("w-4 h-4 transition-transform", !open && "-rotate-90")} />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  !open && "justify-center",
                )}
              >
                {item.icon}
                {open && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* User profile and logout */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            {open && (
              <div className="text-xs text-sidebar-foreground truncate">
                <div className="font-medium">{user?.name}</div>
                <div className="text-sidebar-accent-foreground">{user?.designation}</div>
              </div>
            )}
            <Button onClick={logout} variant="outline" size="sm" className={cn("w-full", !open && "w-auto p-2")}>
              <LogOut className="w-4 h-4" />
              {open && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
