"use client"
import React, { useEffect, useState } from 'react';
import { getToken } from '@/utils/getToken';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface OrderDetails {
  _id: string;
  createdAt: string;
  orderStatus: string;
  items: Array<{
    food: {
      foodName: string;
      image: string;
      foodPrice: number;
    };
    quantity: number;
  }>;
  userId: {
    userName: string;
    userEmail: string;
  };
  totalAmount: number;
  paymentDetails: {
    method: string;
    status: string;
  };
  shippingAddress: string;
  phoneNumber: number;
  deliveryCharge: Number;
}

const orderDetailsBreadcrumb = [

  { label: "Orders", link: "/dashboard/orders" },
  { label: "Order Detail", link: "" }
];


export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<'order' | 'payment'>('order');

  const orderStatusOptions = ["pending", "delivered", "underpreparation", "cancelled", "ontheway"];
  const paymentStatusOptions = ["paid", "unpaid", "failed", "pending"];

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const token = getToken();

        const response = await fetch(`${backendUrl}/api/admin/order/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const result = await response.json();
        setOrderDetails(result.data);
        setDeliveryCharge(result.data.deliveryCharge)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const updateDeliveryCharge = async (newCharge: number) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = getToken();

      const response = await fetch(
        `${backendUrl}/api/admin/order/delivery-charge/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ deliveryCharge: newCharge }),
        }
      );

      if (!response.ok) throw new Error("Failed to update delivery charge");

      // Refresh order details after successful update
      const orderResponse = await fetch(`${backendUrl}/api/admin/order/${id}`, {
        headers: { Authorization: `${token}` }
      });
      const orderResult = await orderResponse.json();
      setOrderDetails(orderResult.data);
      setDeliveryCharge(orderResult.data.deliveryCharge);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const handleOrderStatusChange = async (newStatus: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = getToken();

      const response = await fetch(`${backendUrl}/api/admin/orders/change-order-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      setOrderStatus(newStatus);
      window.location.href = `/dashboard/orders/${id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const handlePaymentStatusChange = async (newStatus: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = getToken();

      const response = await fetch(`${backendUrl}/api/admin/orders/change-payment-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment status");
      } else {
        setPaymentStatus(newStatus);
        window.location.href = `/dashboard/orders/${id}`;


      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderDetails) return <p>No order found</p>;
  console.log()

  return (

    <>
      <Breadcrumb>
        <BreadcrumbList>
          {orderDetailsBreadcrumb.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === orderDetailsBreadcrumb.length - 1 ? (
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
      <div className='grid lg:grid-cols-2 grid-cols-1 mt-6 gap-8 '>
        <div className='border border-1   rounded-md' >
          <div className='  border-b w-full py-4 px-6'>
            <h2 className='text-gray-900 font-medium'>User Information  </h2>
            <p className='text-gray-600 text-xs b mb-4 w-full'>Details About User</p>
          </div>
          <div className='px-4 bg-gray-50'>
            <Table >
              <TableBody>
                <TableRow className='space-y-4'>
                  <TableCell className="font-medium flex justify-between ">Name <p className='text-start'>{orderDetails.userId.userName}</p></TableCell>
                  <TableCell className="font-medium flex justify-between ">Email <p>{orderDetails.userId.userEmail}</p></TableCell>
                  <TableCell className="font-medium flex justify-between ">Phone Number<p>{orderDetails.phoneNumber}</p></TableCell>
                  <TableCell className="font-medium flex justify-between ">Delivery Address <p>{orderDetails.shippingAddress}</p></TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <h2 className='my-4'>Payment Screenshot</h2>
                <img src="/images/ss.png" alt="payment screenshot" className='border border-1 rounded-md mb-4  w-[40%]' />
              </TableFooter>
            </Table>
          </div>
        </div>
        <div className='border border-1   rounded-md'>
          <div className='flex justify-between'>
            <div className='  border-b w-full py-4 px-6'>
              <h2 className='text-gray-900 font-medium'>Order Information  </h2>
              <p className='text-gray-600 text-xs b mb-4 w-full'>Details About Order</p>
            </div>
            <div className="flex items-center gap-4">
              <Select
                defaultValue="order"
                onValueChange={(value) => setSelectedType(value as 'order' | 'payment')}
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="order">Order Status</SelectItem>
                  <SelectItem value="payment">Payment Status</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="bg-red-500 mr-2 hover:bg-red-600 text-center text-white text-sm px-4 py-1 rounded-md transition-colors">
                    Change
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white border rounded-md shadow-lg">
                  {selectedType === 'order' ? (
                    orderStatusOptions.map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleOrderStatusChange(status)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
                      >
                        {status}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    paymentStatusOptions.map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handlePaymentStatusChange(status)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
                      >
                        {status}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='px-4 bg-gray-50'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Food Item</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead >Image</TableHead>
                  <TableHead >Payment status</TableHead>
                  <TableHead >Order Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.food.foodName}</TableCell>
                    <TableCell>{item.food.foodPrice}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell><img src={item.food.image} alt={item.food.foodName} className='w-14' /></TableCell>
                    <TableCell>
                      <div className='flex justify-start items-center'>
                        <button className={` ${orderDetails.paymentDetails.status === 'pending'
                          ? 'bg-yellow-100 border border-1 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                          } px-5 py-1.5 rounded-full `}>
                          {orderDetails.paymentDetails.status}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell >
                      <div className='flex justify-start items-center'>
                        <button className={` ${orderDetails.orderStatus === 'pending'
                          ? 'bg-yellow-100 border border-1 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                          } px-5 py-1.5 rounded-full `}>
                          {orderDetails.orderStatus}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="border-t-2 border-gray-200">
                  <TableCell colSpan={6}>
                    <div className="space-y-4 py-2">
                      <div className="flex items-center justify-between px-4">
                        <span className="font-medium text-gray-700">Subtotal</span>
                        <span className="font-semibold">{orderDetails.totalAmount}</span>
                      </div>

                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center space-x-2">
                          <Plus size={16} className="text-gray-500" />
                          <span className="font-medium text-gray-700">Delivery Charge</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={deliveryCharge}
                            onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                            className="w-24 text-right"
                            min="0"
                          />
                          <Button
                            onClick={() => updateDeliveryCharge(deliveryCharge)}
                            variant="destructive"
                            size="sm"
                          >
                            Update
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-4 pt-3 border-t">
                        <span className="text-sm font-semibold">Total Amount</span>
                        <span className="text-sm font-bold text-gray-900">
                          ₹{1000 + deliveryCharge}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

