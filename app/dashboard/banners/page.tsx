"use client"
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
import { getBanner, deleteBanner } from "@/lib/actions/banner.actions";  // Import deleteBanner

import Link from "next/link";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const tableColumns = (handleDelete: (id: string) => void) => [
  {
    header: "Name",
    accessor: "bannerName",
  },
  {
    header: "Image",
    accessor: "image",
    render: (image: string) => (
      <img src={image} alt="Product" className="w-8 h-8 object-cover" />
    ),
  },
  {
    header: "Action",
    accessor: "action",
    render: (id: string ) => (
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

const Banners = () => {
  const [data, setData] = useState<any[]>([]);  // Manage the banner data state

  // Function to fetch the banners
  const fetchData = async () => {
    const banners = await getBanner();
    setData(banners);
  };

  // Function to handle banner deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteBanner(id);  // Call delete function with banner ID
      // Filter out the deleted banner from the data to update the UI
      setData((prevData) => prevData.filter((banner) => banner._id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
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
      <DynamicTable data={data} columns={tableColumns(handleDelete)} />  {/* Pass handleDelete to columns */}
    </>
  );
};

export default Banners;
