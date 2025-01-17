import DynamicTable from "@/components/dynamicTable/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getOrders } from "@/lib/actions/order.action";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ordersBreadcrumb = [
  { label: "dashboard", link: "/dashboard" },
  { label: "Orders", link: "" },
];

interface Items {
  items: string;
  item: string;
  foodName: string;
  image: string;
}

const tableColumns = [
  {
    header: "Order Name",
    accessor: "items",
    render: (items: Items[]) =>
      items.map((item: Items) => item.foodName).join(", "),
  },
  { header: "User", accessor: "user" },
  {
    header: "Ordered On",
    accessor: "createdAt",
    render: (createdAt: any) =>
      moment(createdAt).format("MMMM Do YYYY, h:mm A"),
  },
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
