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
import { getCategory } from "@/lib/actions/category.action";
import { Eye } from "lucide-react";

const breadCrumbItems = [
  {
    label: "home",
    link: "/",
  },
  {
    label: "dashboard",
    link: "/dashboard",
  },
  {
    label: "Categories",
    link: "",
  },
];

const tableColumns = [
  {
    header: "Category",
    accessor: "categoryName",
    render: (categoryName: string) => (
      <div>{categoryName}</div>
    ),
  },
  {
    header: "Image",
    accessor: "image",
    render: (image: string) => (
      <img src={image} alt="Category" className="w-8 h-8 object-cover" />
    ),
  },
  {
    header: "Action",
    accessor: "action",
    render: () => (
      <button className="text-blue-600 hover:underline">
        <Eye className="text-gray-900" />
      </button>
    ),
  },
];

const Categories = async () => {
  const data = await getCategory();

  // Ensure the data format matches the columns for DynamicTable
  const tableData = data.map((category: any) => ({
    categoryName: category.categoryName,
    image: category.image,
    action: "View",
  }));

  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {breadCrumbItems.map((item, index) => (
              <BreadcrumbItem key={index}>
                {index === breadCrumbItems.length - 1 ? (
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
        <Button variant="ghost">Add Categories</Button>
      </div>

      <DynamicTable data={tableData} columns={tableColumns} />
    </>
  );
};

export default Categories;
