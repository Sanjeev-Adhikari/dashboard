"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { addCategory } from "@/lib/actions/category.action"; // Import the action
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const [fileName, setFileName] = useState<string | null>(null); // State to store the file name
  const router = useRouter();
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Extract form data
    const formData = new FormData(event.currentTarget);
    const categoryName = formData.get("name") as string;
    const image = formData.get("image") as File;

    // Validate inputs
    if (!categoryName || !image) {
      alert("Please provide both a category name and an image.");
      return;
    }

    // Call the action
    try {
      await addCategory(categoryName, image);
      alert("Category created successfully!");
      router.push("/dashboard/categories");
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category. Please try again.");
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-lg text-gray-900 font-bold">
            Add Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Category Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm text-gray-900 font-medium"
              >
                Category Name
              </Label>
              <input
                id="name"
                name="name"
                placeholder="Enter category name"
                required
                className="w-full text-sm p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Category Image */}
            <div className="space-y-2">
              <Label
                htmlFor="image"
                className="text-sm text-gray-900 font-medium"
              >
                Category Image
              </Label>
              <div className="relative w-full p-2 border border-gray-300 rounded-md">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  className="absolute  inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange} // Handle file change event
                />
                <div className="h-full text-sm text-gray-700">
                  Choose File{" "}
                  <span className="ml-2  text-gray-400">
                    {fileName || "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="ghost">
              Create Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
