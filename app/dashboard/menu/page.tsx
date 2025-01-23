"use client";

import { useEffect, useState } from "react";
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

const tableColumns = [
  {
    header: "Food Name",
    accessor: "foodName",
  },
  {
    header: "Image",
    accessor: "image",
    render: (image: string) => (
      <img src={image} alt="Product" className="w-8 h-8 object-cover" />
    ),
  },
  // {
  //   header: "Category",
  //   accessor: "categoryId",
  //   render: (categoryId: any) => (
  //     <div className="w-8 h-8 object-cover">{categoryId.categoryName}</div>
  //   ),
  // },
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
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:outline-none focus:bg-gray-100">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const Menu = () => {


  
  const token = getToken();
  console.log(token)
  const [data, setData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    getMenu()
      .then((response) => {
        setData(response); 
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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

        <Link href="/dashboard/categories/addcategory">
          <Button variant="ghost">Add Category</Button>
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DynamicTable data={data} columns={tableColumns} />
      )}
    </>
  );
};

export default Menu;
