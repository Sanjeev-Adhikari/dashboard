"use client"
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


const tableColumns = [
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
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:outline-none focus:bg-gray-100">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        console.log("token",token)
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        console.log("backend url",backendUrl)

        if (!backendUrl) {
          throw new Error(
            "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables."
          );
        }

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
        setData(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === breadcrumbs.length - 1 ? (
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
      <DynamicTable data={data} columns={tableColumns} />
    </>
  );
};

export default Users;
