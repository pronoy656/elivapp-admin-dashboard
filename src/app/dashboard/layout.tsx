"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Briefcase,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  Share2,
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
              <SidebarMenu className="gap-3">
                <SidebarMenuItem><SidebarMenuButton render={<Link href="/dashboard" />}  isActive={pathname === "/dashboard"} className={`relative rounded-lg ${pathname === "/dashboard" ? 'bg-sidebar-accent hover:bg-sidebar-accent' : 'hover:bg-sidebar-accent'}`}>
                    <div className="flex items-center gap-3 h-12 px-3">
                      <LayoutDashboard className={`h-5 w-5 ${pathname === "/dashboard" ? 'text-[#D7FE7C]' : 'text-[#94A3B8]'}`} />
                      <span className={`${pathname === "/dashboard" ? 'text-white' : 'text-muted-foreground hover:text-white transition-colors'} font-medium text-base tracking-wide`}>Dashboard</span>
                      {pathname === "/dashboard" && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#D7FE7C] rounded-full"></div>}
                                        </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton render={<Link href="/dashboard/referrals" />}  isActive={pathname === "/dashboard/referrals"} className={`relative rounded-lg ${pathname === "/dashboard/referrals" ? 'bg-sidebar-accent hover:bg-sidebar-accent' : 'hover:bg-sidebar-accent'}`}>
                    <div className="flex items-center gap-3 h-12 px-3">
                      <Share2 className={`h-5 w-5 ${pathname === "/dashboard/referrals" ? 'text-[#D7FE7C]' : 'text-[#94A3B8]'}`} />
                      <span className={`${pathname === "/dashboard/referrals" ? 'text-white' : 'text-muted-foreground hover:text-white transition-colors'} font-medium text-base tracking-wide`}>Referrals</span>
                      {pathname === "/dashboard/referrals" && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#D7FE7C] rounded-full"></div>}
                                        </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton render={<Link href="/dashboard/businesses" />}  isActive={pathname === "/dashboard/businesses"} className={`relative rounded-lg ${pathname === "/dashboard/businesses" ? 'bg-sidebar-accent hover:bg-sidebar-accent' : 'hover:bg-sidebar-accent'}`}>
                    <div className="flex items-center gap-3 h-12 px-3 w-full">
                      <Briefcase className={`h-5 w-5 ${pathname === "/dashboard/businesses" ? 'text-[#D7FE7C]' : 'text-[#94A3B8]'}`} />
                      <span className={`${pathname === "/dashboard/businesses" ? 'text-white' : 'text-muted-foreground hover:text-white transition-colors'} font-medium text-base tracking-wide`}>Businesses</span>
                      <Badge className="ml-auto bg-[#0A355C] text-[#D7FE7C] hover:bg-[#0A355C] h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">2</Badge>
                      {pathname === "/dashboard/businesses" && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#D7FE7C] rounded-full"></div>}
                                        </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton render={<Link href="/dashboard/promoters" />}  isActive={pathname === "/dashboard/promoters"} className={`relative rounded-lg ${pathname === "/dashboard/promoters" ? 'bg-sidebar-accent hover:bg-sidebar-accent' : 'hover:bg-sidebar-accent'}`}>
                    <div className="flex items-center gap-3 h-12 px-3 w-full">
                      <Users className={`h-5 w-5 ${pathname === "/dashboard/promoters" ? 'text-[#D7FE7C]' : 'text-[#94A3B8]'}`} />
                      <span className={`${pathname === "/dashboard/promoters" ? 'text-white' : 'text-muted-foreground hover:text-white transition-colors'} font-medium text-base tracking-wide`}>Promoters</span>
                      <Badge className="ml-auto bg-[#0A355C] text-[#D7FE7C] hover:bg-[#0A355C] h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">2</Badge>
                      {pathname === "/dashboard/promoters" && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#D7FE7C] rounded-full"></div>}
                                        </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton render={<Link href="/dashboard/notifications" />}  isActive={pathname === "/dashboard/notifications"} className={`relative rounded-lg ${pathname === "/dashboard/notifications" ? 'bg-sidebar-accent hover:bg-sidebar-accent' : 'hover:bg-sidebar-accent'}`}>
                    <div className="flex items-center gap-3 h-12 px-3">
                      <Bell className={`h-5 w-5 ${pathname === "/dashboard/notifications" ? 'text-[#D7FE7C]' : 'text-[#94A3B8]'}`} />
                      <span className={`${pathname === "/dashboard/notifications" ? 'text-white' : 'text-muted-foreground hover:text-white transition-colors'} font-medium text-base tracking-wide`}>Notifications</span>
                      {pathname === "/dashboard/notifications" && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#D7FE7C] rounded-full"></div>}
                                        </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton render={<Link href="/dashboard/settings" />}  isActive={pathname === "/dashboard/settings"} className={`relative rounded-lg ${pathname === "/dashboard/settings" ? 'bg-sidebar-accent hover:bg-sidebar-accent' : 'hover:bg-sidebar-accent'}`}>
                    <div className="flex items-center gap-3 h-12 px-3">
                      <Settings className={`h-5 w-5 ${pathname === "/dashboard/settings" ? 'text-[#C7F556]' : 'text-[#94A3B8]'}`} />
                      <span className={`${pathname === "/dashboard/settings" ? 'text-white' : 'text-muted-foreground hover:text-white transition-colors'} font-medium text-base tracking-wide`}>Settings</span>
                      {pathname === "/dashboard/settings" && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#C7F556] rounded-full"></div>}
                                        </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
          <Button variant="ghost" className="w-full justify-start text-[#FF4D4D] hover:text-[#FF4D4D] hover:bg-[#FF4D4D]/10 px-4 mt-2 h-10">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
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
            <div className="hidden md:flex items-center bg-[#00152B] rounded-lg p-1 h-10">
              <button className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-white rounded-md transition-colors">7D</button>
              <button className="px-4 py-1.5 text-xs font-medium text-white bg-[#0A355C] rounded-md shadow-sm">30D</button>
              <button className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-white rounded-md transition-colors">90D</button>
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-[#0A355C]">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FF4D4D] ring-2 ring-background"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
            <DropdownMenu><DropdownMenuTrigger render={<div className="flex items-center gap-2 cursor-pointer hover:bg-[#0A355C] p-1.5 pr-3 rounded-full transition-colors" />}>
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
                <DropdownMenuItem className="focus:bg-[#FF4D4D]/10 focus:text-[#FF4D4D] !text-[#FF4D4D] cursor-pointer rounded-lg px-3 py-2.5 outline-none transition-colors">
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
