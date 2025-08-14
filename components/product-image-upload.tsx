"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface ProductImageUploadProps {
  productId: string;
  onUploadComplete: (images: ProductImage[]) => void;
}

export function ProductImageUpload({
  productId,
  onUploadComplete,
}: ProductImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<ProductImage[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxSize: 10000000, // 10MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);
      setProgress(0);

      const images: ProductImage[] = [];

      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];

        // Get signed upload params from backend
        const { data: uploadParams } = await axios.get(
          `/api/products/${productId}/upload-signature`,
          {
            params: { filename: file.name },
          }
        );

        // Create form data for upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", uploadParams.apiKey);
        formData.append("timestamp", uploadParams.timestamp.toString());
        formData.append("signature", uploadParams.signature);
        formData.append("folder", `products/${productId}`);

        // Upload to Cloudinary
        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${uploadParams.cloudName}/image/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                ((i + progressEvent.loaded / progressEvent.total!) /
                  acceptedFiles.length) *
                  100
              );
              setProgress(percentCompleted);
            },
          }
        );

        // Save image reference to backend
        const { data: savedImage } = await axios.post(
          `/api/products/${productId}/images`,
          {
            cloudinaryUrl: uploadResponse.data.secure_url,
            cloudinaryPublicId: uploadResponse.data.public_id,
            isPrimary: i === 0 && uploadedImages.length === 0, // First image is primary if no others exist
          }
        );

        images.push(savedImage);
      }

      setUploadedImages((prev) => [...prev, ...images]);
      onUploadComplete(images);
      setUploading(false);
    },
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl text-gray-300">
            <i className="far fa-cloud-upload" />
          </div>
          <p className="text-gray-600">
            Drag & drop product images here, or click to select files
          </p>
          <p className="text-sm text-gray-400">
            Supported formats: JPG, PNG, WebP. Max size: 10MB.
          </p>
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
          {/* <Progress value={progress} className="h-2" /> */}
          <p className="text-sm text-gray-600">Uploading... {progress}%</p>
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {uploadedImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.cloudinaryUrl}
                alt="Product"
                className="rounded-lg object-cover w-full aspect-square"
              />
              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary"
                  onClick={() => {}}
                >
                  <i className="far fa-star" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-destructive"
                  onClick={() => {}}
                >
                  <i className="far fa-trash" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
