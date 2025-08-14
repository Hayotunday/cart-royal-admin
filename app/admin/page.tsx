import React, { Fragment } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function getSessionData() {
  // In a real app, you'd fetch this from your auth provider
  return {
    user: {
      name: "Admin",
      role: "SUPER_ADMIN",
    },
  };
}

async function getDashboardData(role: string) {
  // In a real app, you'd fetch this from your API
  return {
    totalProducts: 125,
    pendingApproval: 12,
    approvedProducts: 113,
    totalAdmins: 5,
    daysSinceLastLogin: 2,
    recentActivity: [
      {
        id: "1",
        action: "create",
        entityType: "product",
        timestamp: new Date().toISOString(),
        admin: { username: "Alice" },
      },
      {
        id: "2",
        action: "approve",
        entityType: "product",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        admin: { username: "Bob" },
      },
    ] as ActivityLog[],
  };
}

export default async function Dashboard() {
  const session = await getSessionData();
  const role = session.user.role;
  const isSuperAdmin = role === "SUPER_ADMIN";
  const data = await getDashboardData(role);

  const recentActivity: ActivityLog[] = data.recentActivity || [];

  return (
    // if (status === "loading") {
    //   return <div className="flex items-center justify-center h-screen">Loading...</div>;
    // }

    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Welcome, {session.user.name}</h2>
        <h2 className="text-2xl font-bold">Welcome, {"Admin"}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{0}</div>{" "}
              {/* Number of total products */}
              <p className="text-xs text-gray-500 mt-1">
                {isSuperAdmin ? "Across all admins" : "Added by you"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{0}</div>{" "}
              {/* Number of pending approvals */}
              <p className="text-xs text-gray-500 mt-1">
                {isSuperAdmin ? "Awaiting your review" : "Awaiting approval"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Approved Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{0}</div>
              <p className="text-xs text-gray-500 mt-1">
                Live on the main site
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {isSuperAdmin ? "Total Admins" : "Days Since Last Login"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isSuperAdmin ? 0 : 0}{" "}
                {/* Total admins or days since last login */}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {isSuperAdmin ? "Active accounts" : "Last active"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity?.map((activity: any) => (
                <div key={activity?.id} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <i
                      className={`far fa-${getActivityIcon(
                        activity?.action
                      )} text-primary`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {activity?.admin.username}{" "}
                      {formatAction(activity?.action)} {activity?.entityType}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(activity?.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* {(!recentActivity || recentActivity.length === 0) && ( */}
              <p className="text-sm text-gray-500 text-center py-4">
                No recent activity found
              </p>
              {/* )} */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/products/add"
                className="bg-primary/10 hover:bg-primary/20 p-4 rounded-lg text-center transition-colors"
              >
                <i className="far fa-plus-circle text-2xl text-primary mb-2" />
                <p className="text-sm font-medium">Add New Product</p>
              </Link>

              <Link
                href="/admin/products"
                className="bg-primary/10 hover:bg-primary/20 p-4 rounded-lg text-center transition-colors"
              >
                <i className="far fa-boxes text-2xl text-primary mb-2" />
                <p className="text-sm font-medium">View Products</p>
              </Link>

              {isSuperAdmin && (
                <>
                  <Link
                    href="/admin/products/pending"
                    className="bg-primary/10 hover:bg-primary/20 p-4 rounded-lg text-center transition-colors"
                  >
                    <i className="far fa-clock text-2xl text-primary mb-2" />
                    <p className="text-sm font-medium">Pending Approval</p>
                  </Link>

                  <Link
                    href="/admin/admins"
                    className="bg-primary/10 hover:bg-primary/20 p-4 rounded-lg text-center transition-colors"
                  >
                    <i className="far fa-users-cog text-2xl text-primary mb-2" />
                    <p className="text-sm font-medium">Manage Admins</p>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function getActivityIcon(action: string) {
  switch (action) {
    case "create":
      return "plus-circle";
    case "update":
      return "edit";
    case "delete":
      return "trash";
    case "approve":
      return "check-circle";
    case "reject":
      return "times-circle";
    case "submit":
      return "paper-plane";
    default:
      return "history";
  }
}

function formatAction(action: string) {
  switch (action) {
    case "create":
      return "created a new";
    case "update":
      return "updated a";
    case "delete":
      return "deleted a";
    case "approve":
      return "approved a";
    case "reject":
      return "rejected a";
    case "submit":
      return "submitted a";
    default:
      return action;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
