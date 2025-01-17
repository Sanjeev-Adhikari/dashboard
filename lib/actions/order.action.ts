import { OrderData } from "@/interface/orderTypes";

export async function getOrders() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error(
        "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables."
      );
    }

    const response = await fetch(`${backendUrl}/api/admin/orders`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    const orders = data.data;

    if (orders && orders.length > 0) {
      return orders.map((order: OrderData) => ({
        ...order,
        items: order.items.map((item) => ({
          foodName: item.food.foodName,
          quantity: item.quantity,
          image: item.food.image,
        })),
        user: order.user.userName,
        userEmail: order.user.userEmail,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentDetails.status,

        shippingAddress: order.shippingAddress,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching order data:", error);
    return [];
  }
}
