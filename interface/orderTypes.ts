export interface OrderData {
    _id: string;
    userId: {
      _id: string;
      userName: string;
      userEmail: string;
    };
    items: {
      _id: string;
      quantity: number;
      food: {
        _id: string;
        foodName: string;
        image: string;
      };
    }[];
    totalAmount: number;
    shippingAddress: string;
    phoneNumber: number;
    orderStatus: string;
    paymentDetails: {
      status: string;
    };
  }
  