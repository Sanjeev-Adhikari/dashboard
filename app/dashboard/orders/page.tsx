import DynamicTable from "@/components/dynamicTable/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getOrders } from "@/lib/actions/order.action";
import { Eye } from "lucide-react";

const ordersBreadcrumb = [
  { label: "home", link: "/" },
  { label: "dashboard", link: "/dashboard" },
  { label: "Orders", link: "" }
];

interface Items{
  items: string,
  item: string,
  foodName: string,
  image: string

}

const tableColumns = [
  { header: "Order Name", accessor: "items", render: (items: Items[]) => items.map((item:Items ) => item.foodName).join(", ") },
  { header: "User", accessor: "user" },
  { header: "Email", accessor: "userEmail" },
  {
    header: "Image",
    accessor: "items",
    render: (items: Items[]) => (
      <>
        {items.map((item: Items, index: number) => (
          <img
            key={index}
            src={item.image} 
            alt={item.foodName}
            className="w-8 h-8 object-cover"
          />
        ))}
      </>
    ),
  },
  { header: "Price", accessor: "totalAmount" },
  { header: "Payment Status", accessor: "paymentStatus" },
  { header: "Shipping Address", accessor: "shippingAddress" },
  {
    header: "Action",
    accessor: "action",
    render: () => (
      <button className="text-blue-600 hover:underline"><Eye className="text-gray-900"/></button>
    ),
  },
];

const Orders = async () => {
  const data = await getOrders();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {ordersBreadcrumb.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === ordersBreadcrumb.length - 1 ? (
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

export default Orders;
