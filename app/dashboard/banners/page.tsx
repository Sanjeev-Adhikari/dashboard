"use client";

import { useState, useEffect } from "react";
import DynamicTable from "@/components/dynamicTable/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { breadCrumbItems } from "@/constants/constants";

import Link from "next/link";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getToken } from "@/utils/getToken";

// Constants for breadcrumbs
const inbox: breadCrumbItems[] = [
  {
    label: "dashboard",
    link: "/dashboard",
  },
  {
    label: "Banners",
    link: "/dashboard/banners",
  },
];

// Table columns definition
const tableColumns = (handleDelete: (id: string) => void) => [
  {
    header: "Name",
    accessor: "bannerName",
  },
  {
    header: "Image",
    accessor: "image",
    render: (image: string) => (
      <img src={image} alt="Banner" className="w-8 h-8 object-cover" />
    ),
  },
  {
    header: "Action",
    accessor: "action",
    render: (id: string) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center focus:outline-none">
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:outline-none focus:bg-gray-100">
            <Eye className="h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:outline-none focus:bg-gray-100">
            <Edit className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-red-600 focus:outline-none focus:bg-gray-100"
            onClick={() => handleDelete(id)}  // Pass the banner ID to delete
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// Main Banners component
const Banners = () => {
  const [data, setData] = useState<any[]>([]);  // State for storing banner data
  const [loading, setLoading] = useState<boolean>(true);  // State for loading state
  const [error, setError] = useState<string | null>(null);  // State for error handling

  // Function to fetch banners from the API
  const fetchData = async () => {
    const token = getToken();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      setError("Backend URL is not defined.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/admin/banners`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,  // Include token in the request header
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch banners: ${response.statusText}`);
      }

      const data = await response.json();
      setData(data.data);  // Set the fetched banner data
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);  // Set loading to false once fetch is complete
    }
  };

  // Function to handle deleting a banner
  const handleDelete = async (id: string) => {
   const token = getToken()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      setError("Backend URL is not defined.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/admin/banner/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,  // Include token in the request header
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete banner: ${response.statusText}`);
      }

      const data = await response.json();
      // Update the state by filtering out the deleted banner
      setData((prevData) => prevData.filter((banner) => banner._id !== id));
      console.log("Banner deleted successfully:", data);
    } catch (error: any) {
      setError(`Error deleting banner: ${error.message}`);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {inbox.map((item, index) => (
              <BreadcrumbItem key={index}>
                {index === inbox.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={item.link}>
                      {item.label}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <Link href="/dashboard/banners/addbanner">
          <Button variant="ghost">Add Banner</Button>
        </Link>
      </div>

      {/* Show loading or error state */}
      {loading && <div>Loading banners...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {/* Dynamic Table Component */}
      {!loading && !error && (
        <DynamicTable data={data} columns={tableColumns(handleDelete)} />
      )}
    </div>
  );
};

export default Banners;
