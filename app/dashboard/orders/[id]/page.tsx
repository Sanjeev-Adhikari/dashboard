"use client"
import { useEffect, useState } from 'react';
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
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const token = getToken();

        const response = await fetch(`${backendUrl}/api/admin/order/${params.id}`, {
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params.id]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderDetails) return <p>No order found</p>;
  console.log()

  return (
    <div className="container mx-auto p-4 text-sm">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Order Summary Card */}
      <Card className="md:col-span-2">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 ">
              <Package className="w-6 h-6 text-blue-600" />
              Order Details - #{orderDetails._id}
            </CardTitle>
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
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 p-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Customer Information
            </h3>
            <div className="space-y-2">
              <p>Name: {orderDetails.userId.userName}</p>
              <p>Email: {orderDetails.userId.userEmail}</p>
              <p>Phone: {orderDetails.phoneNumber}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Order Summary
            </h3>
            <div className="space-y-2">
              <p>Ordered On: {moment(orderDetails.createdAt).format('MMMM Do YYYY, h:mm A')}</p>
              <p>Total Amount: ${orderDetails.totalAmount}</p>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className='font-semibold'>
                  Payment: {orderDetails.paymentDetails.method} - {orderDetails.paymentDetails.status}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address Card */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p>{orderDetails.shippingAddress}</p>
        </CardContent>
      </Card>

      {/* Order Items Card */}
      <Card className="md:col-span-3">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {orderDetails.items.map((item, index) => (
              <div 
                key={index} 
                className="border rounded-lg overflow-hidden shadow-sm flex items-center"
              >
                <img 
                  src={item.food.image} 
                  alt={item.food.foodName} 
                  className="w-24 h-24 object-cover" 
                />
                <div className="p-4">
                  <h4 className="font-semibold text-sm">{item.food.foodName}</h4>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}