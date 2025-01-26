"use client"
import React, { useEffect, useState } from 'react';
import { getToken } from '@/utils/getToken';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import moment from 'moment';
import { Clock, CreditCard, MapPin, Package, User } from 'lucide-react';

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

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);

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
        method: "POST",
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const handlePaymentStatusChange = async (newStatus: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = getToken();

      const response = await fetch(`${backendUrl}/api/admin/order/${id}/payment-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }

      setPaymentStatus(newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderDetails) return <p>No order found</p>;
  console.log()

  return (

    <div className="">
      <div className="py-14 px-8 md:px-6  2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-sm dark:text-white lg:text-2xl font-semibold text-gray-800">Order: {orderDetails._id}</h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> {moment(orderDetails.createdAt).format('MMMM Do YYYY, h:mm A')}</p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">My Order</p>
              {
                orderDetails.items.map((item, index) => (
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-4 w-full">
                    <div className=" flex justify-start flex-col md:flex-row items-start md:items-center  md:space-x-2 xl:space-x-2 w-full">
                      <div className="w-full md:w-40">
                        <img className="w-20 h-20 md:block" src={item.food.image} alt={item.food.foodName} />
                      </div>
                      <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-sm dark:text-white xl:text-xl font-semibold leading-6 text-gray-800">{item.food.foodName}</h3>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base dark:text-white xl:text-lg leading-6">Rs: {item.food.foodPrice} </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">Qty: {item.quantity}</p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Total: {item.food.foodPrice * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Home Delivery</h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Delivery charge<br /><span className="font-normal">Delivery within 24 Hours</span></p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                      Delivery charge<br />
                      <span className="font-normal">Delivery within 24 Hours</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={deliveryCharge}
                    onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                    className="w-20 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => updateDeliveryCharge(deliveryCharge)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Payment Method</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderDetails.paymentDetails.method}</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
                    <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${orderDetails.paymentDetails.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                      }
            `}>
                      {orderDetails.paymentDetails.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
                    <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${orderDetails.orderStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                      }
            `}>
                      {orderDetails.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">Rs: {orderDetails.totalAmount + deliveryCharge}</p>
                </div>
              </div>


            </div>
            <div className="flex  justify-between items-center w-full gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 w-[50%]  h-full flex justify-between items-center md:items-start px-4 py-6 md:p-6  flex-col">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-600">Customer Info</h3>
                <div className="flex flex-col justify-start items-stretch  h-full w-full">
                  <div className="flex flex-col justify-center items-start space-y-2  xl:mt-4">
                    <p className="text-base  leading-5 text-gray-600">Name: {orderDetails.userId.userName}</p>
                    <p className="text-base  leading-5 text-gray-600">Email: {orderDetails.userId.userEmail}</p>
                    <p className="text-base  leading-5 text-gray-600">Phone: {orderDetails.phoneNumber}</p>
                  </div>

                </div>

              </div>
              <div className='bg-gray-50 h-full w-[50%]'>
                <div className='p-6'>
                <div>
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-600">Change Status</h3>
                </div>
                <div className=" flex flex-col space-y-4">
                  <div className='flex justify-between mt-4   w-full '>

                    <div className='flex justify-between w-full items-center'>
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Payment Status
                      </p>
                      <select
                        value={paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(e.target.value)}
                        className="text-base dark:text-gray-300 leading-4 text-gray-600 border border-gray-300 rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>



                  <div className='flex justify-between w-full items-center'>
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Order Status
                    </p>
                    <select
                      value={orderStatus}
                      onChange={(e) => handleOrderStatusChange(e.target.value)}
                      className="text-base dark:text-gray-300 leading-4 text-gray-600 border border-gray-300 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>





  );
}