"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/global/header";

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  status: "active" | "inactive";
  createdAt: string;
}

export default function StaffListPage() {
  const [search, setSearch] = useState("");
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;

    async function loadStaff() {
      try {
        const res = await fetch("/api/auth/signup");
        const data = await res.json();

        if (!isMounted) return;

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch staff members");
        }

        setStaffList(data);
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "An unexpected error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadStaff();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter list by name or email
  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.email.toLowerCase().includes(search.toLowerCase())
  );

  // Delete user from DB and local state
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;

    try {
      const res = await fetch(`/api/admin/staff?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete member");
        return;
      }

      setStaffList((prev) => prev.filter((staff) => staff.id !== id));
    } catch {
      alert("Could not connect to the server to delete staff member.");
    }
  };

  return (
    <>
      <Header
        title="Staff"
        actionLabel="Add New Staff"
        actionIcon={<Plus className="h-4 w-4" />}
        onActionClick={() => router.push("/ui/admin/staff/staff-form")}
      />
      <div className="min-h-screen bg-muted/40 p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
              <p className="text-sm text-muted-foreground">
                View, search, and manage registered staff members.
              </p>
            </div>
          </div>

          {/* Card & Table */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Staff Members</CardTitle>
                  <CardDescription>
                    A total of {filteredStaff.length} member(s) found.
                  </CardDescription>
                </div>

                {/* Search Filter */}
                <div className="w-full sm:w-64">
                  <Input
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {error && (
                <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="h-32 text-center text-muted-foreground"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Loading staff members...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredStaff.length > 0 ? (
                      filteredStaff.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell className="font-mono text-xs font-medium text-muted-foreground">
                            {staff.id}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {staff.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {staff.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={staff.role === "admin" ? "default" : "secondary"}
                              className="capitalize"
                            >
                              {staff.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                staff.status === "active"
                                  ? "border-green-500/50 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
                                  : "border-muted-foreground/30 text-muted-foreground"
                              }
                            >
                              {staff.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {staff.createdAt}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDelete(staff.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="h-32 text-center text-muted-foreground"
                        >
                          No staff members found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}