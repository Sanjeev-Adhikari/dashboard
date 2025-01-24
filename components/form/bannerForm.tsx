"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/getToken"; 

export default function BannerForm() {
  const [fileName, setFileName] = useState<string | null>(null); 
  const router = useRouter();

  const addBanner = async (bannerName: string, image: File) => {
    const token = getToken(); 
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl || !token) {
      throw new Error("Backend URL or token is missing");
    }

    const formData = new FormData();
    formData.append("bannerName", bannerName);
    formData.append("image", image);

    try {
      const response = await fetch(`${backendUrl}/api/admin/add-banner`, {
        method: "POST",
        headers: {
          "Authorization": `${token}`, 
        },
        body: formData, 
      });

      if (!response.ok) {
        throw new Error(`Failed to create banner: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const bannerName = formData.get("bannerName") as string;
    const image = formData.get("image") as File;

    if (!bannerName || !image) {
      console.error("Both name and image are required.");
      alert("Please provide both the banner name and an image.");
      return;
    }

    try {
      await addBanner(bannerName, image);
      alert("Banner created successfully!");
      router.push("/dashboard/banners");
    } catch (error) {
      console.error("Error creating banner:", error);
      alert("Failed to create banner. Please try again.");
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
            Add Banner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Banner Name */}
            <div className="space-y-2 text-sm">
              <Label htmlFor="bannerName" className="text-gray-900 font-medium">
                Banner Name
              </Label>
              <input
                id="name"
                name="bannerName"
                placeholder="Enter banner name"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Banner Image */}
            <div className="space-y-2 text-sm">
              <Label htmlFor="image" className="text-gray-900 font-medium">
                Banner Image
              </Label>
              <div className="relative w-full p-2 border border-gray-300 rounded-md">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange} 
                />
                <div className="h-full text-gray-500">
                  Choose File{" "}
                  <span className="ml-2 text-gray-400">
                    {fileName || "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="ghost">
              Create Banner
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
