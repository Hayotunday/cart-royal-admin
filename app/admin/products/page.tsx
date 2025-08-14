import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data for products
const myProducts: Product[] = [
  {
    id: "prod_1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    stock: 150,
    status: "APPROVED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sku: "WNH-101",
    description: "",
    images: [],
    categories: [],
    adminId: "admin_1",
  },
  {
    id: "prod_2",
    name: "Smartwatch Series 8",
    price: 399.0,
    stock: 75,
    status: "PENDING_APPROVAL",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sku: "SW-800",
    description: "",
    images: [],
    categories: [],
    adminId: "admin_1",
  },
  {
    id: "prod_3",
    name: "Organic Cotton T-Shirt",
    price: 25.0,
    stock: 300,
    status: "DRAFT",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sku: "OCT-01-BLK",
    description: "",
    images: [],
    categories: [],
    adminId: "admin_1",
  },
];

export default function MyProductsPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>My Products</CardTitle>
              <CardDescription>
                A list of products you have added.
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/products/add">Add New Product</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.status}</Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <i className="far fa-edit" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
