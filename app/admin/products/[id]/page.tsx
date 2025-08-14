import React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <CardDescription>SKU: {product.sku}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{product.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge
                    variant={
                      product.status === "APPROVED" ? "default" : "secondary"
                    }
                  >
                    {product.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold">Stock:</h4>
                  <p>{product.stock} units available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              {product.images && product.images.length > 0 ? (
                <div className="relative aspect-square">
                  <Image
                    src={product.images[0].cloudinaryUrl}
                    alt={product.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500">No images available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
