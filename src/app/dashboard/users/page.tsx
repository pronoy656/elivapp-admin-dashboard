"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, UserPlus, MoreVertical, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Dummy initial users
const initialUsers = [
  { id: "U-1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: "U-2", name: "Alice Smith", email: "alice@example.com", role: "User", status: "Active" },
  { id: "U-3", name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // New user form state
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState("User")

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserName || !newUserEmail) return

    const newUser = {
      id: `U-${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "Active",
    }
    setUsers([...users, newUser])
    setIsDialogOpen(false)
    setNewUserName("")
    setNewUserEmail("")
    setNewUserRole("User")
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">User Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage your users, assign roles, and view user activity.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9 bg-[#042850] border-[#0A355C] text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={<Button className="bg-[#C7F556] text-[#001F3E] hover:bg-[#b5e045] font-semibold" />}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#042850] text-white border-[#0A355C]">
              <DialogHeader>
                <DialogTitle className="text-xl text-white">Create New User</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Fill in the details to create a new user account.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="e.g. Jane Doe"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="bg-[#00152B] border-[#0A355C] text-white"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. jane@example.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="bg-[#00152B] border-[#0A355C] text-white"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Role
                    </label>
                    <select
                      id="role"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-[#0A355C] bg-[#00152B] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C7F556]"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-muted-foreground hover:text-white hover:bg-[#0A355C]">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#C7F556] text-[#001F3E] hover:bg-[#b5e045] font-semibold">
                    Create User
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-[#00152B] border-[#0A355C]">
        <CardHeader>
          <CardTitle className="text-white">All Users</CardTitle>
          <CardDescription className="text-muted-foreground">
            A list of all users registered in the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-[#0A355C]">
            <Table>
              <TableHeader className="bg-[#042850]">
                <TableRow className="border-[#0A355C] hover:bg-transparent">
                  <TableHead className="text-white">ID</TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Role</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-[#0A355C] hover:bg-[#042850]/50 transition-colors">
                      <TableCell className="font-medium text-[#C7F556]">{user.id}</TableCell>
                      <TableCell className="text-white">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#0A355C] flex items-center justify-center font-bold text-xs text-white">
                            {user.name.charAt(0)}
                          </div>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {user.role === 'Admin' && <Shield className="h-3.5 w-3.5 text-blue-400" />}
                          <span className={user.role === 'Admin' ? "text-blue-400 font-medium" : "text-white"}>{user.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          user.status === 'Active' 
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-[#0A355C]">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
