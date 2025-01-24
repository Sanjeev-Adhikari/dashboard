"use client";
import DynamicTable from "@/components/dynamicTable/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadCrumbItems } from "@/constants/constants";

import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/getToken";

const categoriesBreadcrumb: breadCrumbItems[] = [
  {
    label: "dashboard",
    link: "/dashboard",
  },
  {
    label: "Categories",
    link: "",
  },
];

const Categories = () => {
  const [data, setData] = useState<any[]>([]); // State for storing categories data
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const token = getToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      setError("Backend URL is not defined.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/category`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();
      setData(data.data); // Set the fetched data
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const handleDelete = async (_id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (!confirmed) {
      return; // If the user clicks "Cancel", exit the function
    }

    if (!_id) {
      console.error("ID is undefined or invalid.");
      return;
    }
  
    const token = getToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
    if (!backendUrl) {
      console.error("Backend URL is not defined.");
      return;
    }
  
    try {
      const response = await fetch(`${backendUrl}/api/admin/delete-category/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, 
        },
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error Details:", errorDetails);
        throw new Error(
          `Failed to delete category: ${response.status} - ${errorDetails.message || "Unknown error"}`
        );
      }
  
      console.log("Category deleted successfully");
      // Refresh data after successful deletion
      fetchData();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const tableColumns = [
    {
      header: "Category Name",
      accessor: "categoryName",
    },
    {
      header: "Image",
      accessor: "image",
      render: (image: any) => <img src={image.image} alt="Category" className="w-8 h-8 object-cover" />,
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
              onClick={() => handleDelete(row._id)} // Call handleDelete with the ID
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {categoriesBreadcrumb.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === categoriesBreadcrumb.length - 1 ? (
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

      {loading && <div>Loading Categories...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && <DynamicTable data={data} columns={tableColumns} />}
    </>
  );
};

export default Categories;
