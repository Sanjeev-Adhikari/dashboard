
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
import { getMenu } from "@/lib/actions/menu.action";
import { Eye } from "lucide-react";


const menu: breadCrumbItems[] = [
  {
    label: "home",
    link: "/"
  },

  {
    label: "dashboard",
    link: "/dashboard"
  },
  {
    label: "Menu",
    link: ""
  }

]



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
  {
    header: "Category",
    accessor: "categoryId",
    render: (categoryId: any,) => (
      <div className="w-8 h-8 object-cover" >{categoryId.categoryName}</div>
    ),
  },
  {
    header: "Price",
    accessor: "foodPrice",
  },
  {
    header: "Action",
    accessor: "action",
    render: () => (
      <button className="text-blue-600 hover:underline"><Eye className="text-gray-900"/></button>
    ),
  },
];


const Menu = async () => {
  const data = await getMenu();
console.log(data)
  return (
   <>
   <div className="flex justify-between items-center">
     <Breadcrumb>
      <BreadcrumbList>
        {menu.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === menu.length - 1 ? (
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

      
     
    
    <Button variant="ghost">
Add Category
</Button>
</div>
      <DynamicTable data={data} columns={tableColumns} />
    
   </>

   
    
  );
};

export default Menu;
