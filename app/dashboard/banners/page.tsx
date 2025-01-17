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
import { getBanner } from "@/lib/actions/banner.actions";

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
    link: "/dashboard"
  },
  {
    label: "Banners",
    link: "/dashboard/banners"
  }

]



const tableColumns = [

  
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
const Banners = async() => {
  const data = await getBanner();
    return (  
<>
<div className="flex justify-between items-center">
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
      <Link href="/dashboard/banners/addbanner">
          <Button variant="ghost">Add Banner</Button>
        </Link>

</div>
      <DynamicTable data={data} columns={tableColumns} />
</>
    );
}
 
export default Banners;