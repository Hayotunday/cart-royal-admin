import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { getAdmins, getSession } from "@/lib/api";
import { AdminTable } from "@/components/admin-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminsPage() {
  const session = await getSession();
  const admins = await getAdmins();

  if (session.user.role !== "SUPER_ADMIN") {
    return (
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Permission Denied</CardTitle>
            <CardDescription>
              You do not have permission to view this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <AdminTable admins={admins} />
    </DashboardLayout>
  );
}
