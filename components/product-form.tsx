"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategorySelector } from "./category-selector";
import { ProductImageUpload } from "./product-image-upload";

interface ProductFormProps {
  initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price || 0);
  const [sku, setSku] = useState(initialData?.sku || "");
  const [stock, setStock] = useState(initialData?.stock || 0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.categories || []
  );
  const [images, setImages] = useState<ProductImage[]>(
    initialData?.images || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (status: "DRAFT" | "PENDING_APPROVAL") => {
    setIsSubmitting(true);
    const productData = {
      name,
      description,
      price,
      stock,
      categoryIds: selectedCategories,
      status,
      // sku,
    };

    try {
      if (initialData) {
        // Update existing product
        // await axios.put(`/api/products/${initialData.id}`, productData);
      } else {
        // Create new product
        // await axios.post('/api/products', productData);
      }
      // Mock success
      console.log("Submitted:", productData);
      alert(
        `Product ${initialData ? "updated" : "created"} with status: ${status}`
      );
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to submit product", error);
      alert("Failed to submit product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                </div>
                {/* <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div> */}
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductImageUpload
                productId={initialData?.id || "new"}
                onUploadComplete={(newImages) =>
                  setImages((imgs) => [...imgs, ...newImages])
                }
              />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <CategorySelector
                selectedCategories={selectedCategories}
                onChange={setSelectedCategories}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => handleSubmit("DRAFT")}
          disabled={isSubmitting}
        >
          Save Draft
        </Button>
        <Button
          onClick={() => handleSubmit("PENDING_APPROVAL")}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit for Approval"}
        </Button>
      </div>
    </div>
  );
}
