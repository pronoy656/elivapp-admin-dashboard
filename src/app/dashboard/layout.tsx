"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Building2,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Settings,
  QrCode,
  Users,
  Search,
  User,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [headerRange, setHeaderRange] = useState<"7D" | "30D" | "90D">("30D")
  const [unreadNotifications, setUnreadNotifications] = useState(2)

  return (
    <SidebarProvider>
      <Sidebar className="border-r-0">
        <SidebarHeader className="h-24 flex flex-col justify-center px-6 pt-8 pb-4">
          <Link href="/" className="flex items-center justify-center gap-2">
            <img src="/brand-logo.png" alt="Elivapp Icon" className="h-14 w-auto object-contain" />
            <img src="/brand-logo-tag.png" alt="Elivapp" className="h-14 w-auto object-contain brightness-0 invert drop-shadow-sm" />
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-4 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2.5">
                {[
                  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
                  { name: "Referrals", href: "/dashboard/referrals", icon: QrCode },
                  { name: "Businesses", href: "/dashboard/businesses", icon: Building2, count: 2 },
                  { name: "Promoters", href: "/dashboard/promoters", icon: Users, count: 2 },
                  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
                  { name: "Settings", href: "/dashboard/settings", icon: Settings },
                ].map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  const Icon = item.icon

                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive}
                        className={`relative rounded-2xl transition-all h-13 px-4 group ${
                          isActive
                            ? "bg-[#C7F55624]/60 text-white"
                            : "text-white bg-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 h-full w-full relative">
                          <Icon
                            className={`h-5 w-5  ${isActive ? "text-[#C7F556]" : "text-white"
                              }`}
                          />
                          <span className="text-base tracking-wide text-white font-medium">
                            {item.name}
                          </span>

                          {item.count !== undefined && (
                            <span className="ml-auto bg-[#18393D] text-[#C7F556] h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border border-[#234C51]">
                              {item.count}
                            </span>
                          )}

                          {isActive && (
                            <div className={`${item.count !== undefined ? 'ml-2' : 'ml-auto'} w-1.5 h-6 bg-[#C7F556] rounded-full shadow-[0_0_8px_rgba(199,245,86,0.5)]`} />
                          )}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 mt-auto">
          <div className="flex flex-col gap-4 bg-[#0A355C]/50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-[#0A355C]">
                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80" alt="User" />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Shahriar Rabbi</span>
                <span className="text-xs text-muted-foreground">admin@elivapp.com</span>
              </div>
            </div>
          </div>
          <Link href="/auth/login" className="w-full">
            <Button variant="ghost" className="w-full justify-start text-[#FF4D4D] hover:text-[#FF4D4D] hover:bg-[#FF4D4D]/10 px-4 mt-2 h-10 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>

      <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
        <header className="flex h-20 items-center gap-4 px-8 pt-4 bg-[#001F3E]">
          <div className="flex items-center gap-4 flex-1">
            <SidebarTrigger className="-ml-2 text-muted-foreground hover:text-white" />
            <h1 className="text-2xl font-semibold tracking-tight text-white hidden md:block">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[250px] appearance-none bg-[#0A355C] border-none pl-9 h-10 rounded-lg text-white placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-[#D7FE7C]"
                />
              </div>
            </form>
            {/* Interactive Header Range Filter Pills */}
            <div className="hidden md:flex items-center bg-[#00152B] rounded-xl p-1 h-10 border border-[#0A355C]">
              {(["7D", "30D", "90D"] as const).map((range) => {
                const isActive = (headerRange || "30D") === range
                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setHeaderRange(range)}
                    className={`px-3.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${isActive
                      ? "bg-[#0A355C] text-white shadow-sm"
                      : "text-muted-foreground hover:text-white"
                      }`}
                  >
                    {range}
                  </button>
                )
              })}
            </div>

            {/* Interactive Bell Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="relative cursor-pointer h-10 w-10 rounded-full hover:bg-[#0A355C] inline-flex items-center justify-center border-0 bg-transparent text-muted-foreground hover:text-white outline-none transition-colors">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#FF4D4D] ring-2 ring-[#001F3E]" />
                )}
                <span className="sr-only">Notifications</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-[#042850] border-[#0A355C] text-white p-3 rounded-2xl shadow-2xl z-50" align="end">
                <div className="flex items-center justify-between pb-2 border-b border-[#0A355C]">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Notifications</span>
                  {unreadNotifications > 0 && (
                    <button
                      type="button"
                      onClick={() => setUnreadNotifications(0)}
                      className="text-[10px] font-semibold text-[#C7F556] hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="p-2.5 rounded-xl bg-[#00152B] border border-[#0A355C]/60 flex flex-col gap-1">
                    <span className="text-xs font-semibold text-white">New Promoter Registered</span>
                    <span className="text-[11px] text-[#94A3B8]">Alicia Monroe registered as a promoter.</span>
                    <span className="text-[9px] text-[#64748B]">10 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#00152B] border border-[#0A355C]/60 flex flex-col gap-1">
                    <span className="text-xs font-semibold text-white">Dispute Opened</span>
                    <span className="text-[11px] text-[#94A3B8]">Tariq Osman opened dispute #402 for FitZone Gym.</span>
                    <span className="text-[9px] text-[#64748B]">1 hour ago</span>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-[#0A355C]" />
                <Link href="/dashboard/notifications" className="block text-center py-1.5 text-xs font-semibold text-[#C7F556] hover:underline">
                  View All Notifications →
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:bg-[#0A355C] p-1.5 pr-3 rounded-full transition-colors outline-none bg-transparent border-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-white hidden md:block">Admin</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-[#042850] border-[#0A355C] text-white p-2 rounded-xl shadow-2xl" align="end">
                <div className="flex items-center justify-start gap-3 p-2">
                  <Avatar className="h-10 w-10 border border-[#0A355C]">
                    <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="font-semibold text-sm text-white">Admin User</p>
                    <p className="w-[150px] truncate text-xs text-[#94A3B8]">admin@elivapp.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-[#0A355C] my-2" /><DropdownMenuItem render={<Link href="/dashboard/my-profile" />} className="focus:bg-[#0A355C] focus:text-white !text-white cursor-pointer rounded-lg px-3 py-2.5 outline-none transition-colors">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-[#94A3B8] group-focus/dropdown-menu-item:text-[#C7F556]" />
                    <span className="font-medium text-sm">My Profile</span>
                  </div>
                </DropdownMenuItem><DropdownMenuItem render={<Link href="/dashboard/settings" />} className="focus:bg-[#0A355C] focus:text-white !text-white cursor-pointer rounded-lg px-3 py-2.5 outline-none transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-[#94A3B8] group-focus/dropdown-menu-item:text-[#C7F556]" />
                    <span className="font-medium text-sm">Settings</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#0A355C] my-2" />
                <DropdownMenuItem render={<Link href="/auth/login" />} className="focus:bg-[#FF4D4D]/10 focus:text-[#FF4D4D] !text-[#FF4D4D] cursor-pointer rounded-lg px-3 py-2.5 outline-none transition-colors">
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium text-sm">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col p-6 lg:p-8 pt-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
