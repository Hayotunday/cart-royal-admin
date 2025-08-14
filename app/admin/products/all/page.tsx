import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { getProducts } from "@/lib/api";
import { ProductTable } from "@/components/product-table";

export default async function AllProductsPage() {
  const products = await getProducts();

  return (
    <DashboardLayout>
      <ProductTable products={products} title="All Products" />
    </DashboardLayout>
  );
}
