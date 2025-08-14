import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { getProducts, getSession } from "@/lib/api";
import { ProductTable } from "@/components/product-table";

export default async function PendingProductsPage() {
  const session = await getSession();
  const products = await getProducts("PENDING_APPROVAL");

  if (session.user.role !== "SUPER_ADMIN") {
    return (
      <DashboardLayout>
        <p>You do not have permission to view this page.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProductTable products={products} title="Pending Approval" />
    </DashboardLayout>
  );
}
