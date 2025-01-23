"use client"
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


import moment from "moment";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/getToken";

const inbox: breadCrumbItems[] = [
  {
    label: "dashboard",
    link: "/dashboard",
  },
  {
    label: "My Inbox",
    link: "",
  },
];

const tableColumns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Message",
    accessor: "message",
  },
  {
    header: "Phone Number",
    accessor: "phone",
  },
  {
    header: "Messaged On",
    accessor: "createdAt",
    render: (createdAt: any) => moment(createdAt).format("MMMM Do YYYY"),
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
const Inbox =  () => {
   const [data, setData] = useState<any[]>([]);  // State for storing banner data
    const [loading, setLoading] = useState<boolean>(true);  // State for loading state
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
          const response = await fetch(`${backendUrl}/api/admin/inbox`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `${token}`,  // Include token in the request header
            },
          });
    
          if (!response.ok) {
            throw new Error(`Failed to fetch inbox: ${response.statusText}`);
          }
    
          const data = await response.json();
          setData(data.data);  // Set the fetched banner data
        } catch (error: any) {
          setError(`Error: ${error.message}`);
        } finally {
          setLoading(false);  // Set loading to false once fetch is complete
        }
      };

        useEffect(() => {
          fetchData();
        }, []);
    
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {inbox.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === inbox.length - 1 ? (
                // Last item displayed as the current page
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                // Other items as links
                <>
                  <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {loading && <div>Loading Inbox...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
      <DynamicTable data={data} columns={tableColumns} />
    )}
    </>
  );
};

export default Inbox;
