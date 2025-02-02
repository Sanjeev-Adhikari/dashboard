"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DynamicTable from "@/components/dynamicTable/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Eye, MoreVertical } from "lucide-react";
import moment from "moment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { OrderData } from "@/interface/orderTypes";
import { getToken } from "@/utils/getToken";
import { access } from "fs";

const ordersBreadcrumb = [
  { label: "dashboard", link: "/dashboard" },
  { label: "Orders", link: "" },
];

const Orders = () => {
  const router = useRouter();
  const [data, setData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  // Move tableColumns inside the component
  
  const tableColumns = [
    {
      header: "Order Name",
      accessor: "items",
      render: (items: any) => 
        Array.isArray(items.items) ? items.items.map((item: any) => item.foodName).join(", ") : "No items",
    },
    // {
    //   header: "Image",
    //   accessor: "image",
    //   render: (image: any) => (
    //     <img src={image.image} alt={} />
    //   )

    // }
    { header: "User", accessor: "user" },
    {
      header: "Ordered On",
      accessor: "createdAt",
      render: (createdAt: string) =>
        moment(createdAt).format("MMMM Do YYYY, h:mm A"),
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
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer focus:outline-none focus:bg-gray-100"
              onSelect={() => router.push(`/dashboard/orders/${row._id}`)}
            >
              <Eye className="h-4 w-4" />
              View/Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
          throw new Error(
            "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables."
          );
        }
        const token = getToken()

        const response = await fetch(`${backendUrl}/api/admin/orders`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        const orders = result.data;
        
        console.log("orders", orders)

        if (orders && orders.length > 0) {
          const formattedOrders = orders.map((order: OrderData) => ({
            ...order,
            items: order.items.map((item) => ({
              foodName: item.food.foodName,
              quantity: item.quantity,
              image: item.food.image,
            })),
            user: order.userId.userName,
            userEmail: order.userId.userEmail,
            totalAmount: order.totalAmount,
            paymentStatus: order.paymentDetails.status,
            shippingAddress: order.shippingAddress,
          }));
          setData(formattedOrders);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

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