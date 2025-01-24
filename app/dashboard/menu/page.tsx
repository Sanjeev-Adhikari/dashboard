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
import { getMenu } from "@/lib/actions/menu.action"; // Assume this is a promise-based API call
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
const menu: breadCrumbItems[] = [
  {
    label: "dashboard",
    link: "/dashboard",
  },
  {
    label: "Menu",
    link: "",
  },
];

// Table columns definition
const tableColumns = (handleDelete: (id: string) => void) => [
  {
    header: "Food Name",
    accessor: "foodName",
  },
  {
    header: "Image",
    accessor: "image",
    render: (image: any) => (
      <img src={image.image} alt="Product" className="w-8 h-8 object-cover" />
    ),
  },
  {
    header: "Category",
    accessor: "categoryId",
    render: (categoryId: any) => (
      <div className="w-8 h-8 object-cover">{categoryId.categoryId.categoryName}</div>
    ),
  },
  {
    header: "Price",
    accessor: "foodPrice",
  },
  {
    header: "Action",
    accessor: "action",
    render: (row: any) => (
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
            onClick={() => handleDelete(row._id)}  // Use _id to delete
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const Menu = () => {
  const [data, setData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  // Function to fetch menu items from the API
  const fetchData = async () => {
    const token = getToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      setError("Backend URL is not defined.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/food`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch menu: ${response.statusText}`);
      }

      const data = await response.json();
      setData(data.data); 
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deleting a menu item
  const handleDelete = async (_id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this menu item?");
    if (!confirmed) return;

    const token = getToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      setError("Backend URL is not defined.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/admin/delete-food/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`, 
        },
      });

      console.log("response",response)

      if (!response.ok) {
        throw new Error(`Failed to delete menu item: ${response.statusText}`);
      }

      // Filter out the deleted menu item from the data
      setData((prevData) => prevData.filter((item) => item._id !== _id)); 
      console.log("Menu item deleted successfully.");
    } catch (error: any) {
      setError(`Error deleting menu item: ${error.message}`);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {menu.map((item, index) => (
              <BreadcrumbItem key={index}>
                {index === menu.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <Link href="/dashboard/categories/addcategory">
          <Button variant="ghost">Add Category</Button>
        </Link>
      </div>

      {/* Show loading or error state */}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {/* Dynamic Table Component */}
      {!loading && !error && (
        <DynamicTable data={data} columns={tableColumns(handleDelete)} />
      )}
    </>
  );
};

export default Menu;
