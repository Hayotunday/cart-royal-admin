import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { categories } from "@/constants";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategorySelectorProps {
  selectedCategories: string[];
  onChange: (categoryIds: string[]) => void;
}

export function CategorySelector({
  selectedCategories,
  onChange,
}: CategorySelectorProps) {
  const handleToggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  // if (isLoading) {
  //   return <div className="p-4 text-center">Loading categories...</div>;
  // }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Product Categories</h3>
      <p className="text-sm text-gray-500">
        Select all applicable categories for this product
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories?.map((category) => (
          <div key={category.name} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category.name}`}
              checked={selectedCategories.includes(category.name)}
              onCheckedChange={() => handleToggleCategory(category.name)}
            />
            <Label
              htmlFor={`category-${category.name}`}
              className="cursor-pointer"
            >
              {category.name}
            </Label>
          </div>
        ))}
      </div>

      {selectedCategories.length === 0 && (
        <p className="text-sm text-destructive">
          Please select at least one category
        </p>
      )}
    </div>
  );
}
