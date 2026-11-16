"use client"

import * as React from "react"
import {
  CalendarDays,
  LayoutDashboard,
  Trees,
} from "lucide-react"
import { NavMain } from "@/components/side-nav/nav-main"
import { NavUser } from "@/components/side-nav/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const navMain = [
  {
    title: "Dashboard",
    url: "/ui/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    url: "/ui/admin/bookings",
    icon: CalendarDays,
  },
   {
    title: "Staff",
    url: "/ui/admin/staff",
    icon: CalendarDays,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 justify-center border-b border-slate-200 px-3 group-data-[collapsible=icon]:px-0">
        <div className="flex min-w-0 items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <img src="/images/logo.png" alt="Game On logo" className="rounded-md" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-slate-900">TMS</p>
            <p className="truncate text-xs text-slate-500">Admin workspace</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200 p-3 group-data-[collapsible=icon]:px-0">
        <NavUser user={{ userName: "Admin", email: "Administrator account", avatar: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
