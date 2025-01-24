"use client";
import React, { useEffect, useState } from "react";
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
import { getToken } from "@/utils/getToken";

// Define the columns for the user table
const tableColumns = (handleDelete: (id: string) => void) => [
  {
    header: "User Name",
    accessor: "userName",
  },
  {
    header: "User Email",
    accessor: "userEmail",
  },
  {
    header: "Role",
    accessor: "role",
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
            onClick={() => handleDelete(row._id)} // Use _id to delete
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// Breadcrumbs for the page
const breadcrumbs: breadCrumbItems[] = [
  {
    label: "dashboard",
    link: "/dashboard",
  },
  {
    label: "Users",
    link: "",
  },
];

const Users = () => {
  const [data, setData] = useState<any[]>([]); // State for user data
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch users data from the backend
  const fetchData = async () => {
    const token = getToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      setError("Backend URL is not defined.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/admin/all-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result.data); // Store user data in the state
    } catch (error: any) {
      setError(`Error fetching users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) {
      return; // If the user clicks "Cancel", exit the function
    }
  
    const token = getToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
    if (!backendUrl) {
      setError("Backend URL is not defined.");
      return;
    }
  
    try {
      const response = await fetch(`${backendUrl}/api/admin/delete-user/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }
  
      // Remove the deleted user from the state (UI update)
      setData((prevData) => prevData.filter((user) => user._id !== _id));
      console.log("User deleted successfully");
    } catch (error: any) {
      setError(`Error deleting user: ${error.message}`);
    }
  };
  

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Breadcrumb navigation */}
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem key={index}>
                {index === breadcrumbs.length - 1 ? (
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
      </div>

      {/* Show loading or error state */}
      {loading && <div>Loading users...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {/* Render Dynamic Table with users data */}
      {!loading && !error && (
        <DynamicTable data={data} columns={tableColumns(handleDelete)} />
      )}
    </div>
  );
};

export default Users;
