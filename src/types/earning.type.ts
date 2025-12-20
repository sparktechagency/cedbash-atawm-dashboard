interface IEarning {
  _id: string;
  vendorServiceId: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    profileImage: string;
  };
  vendorId: {
    _id: string;
    fullName: string;
    email: string;
    profileImage: string;
  };
  serviceAmount: number;
  adminAmount: number;
  adminCommission: number;
  vendorAmount: number;
  servicePlaceType: string;
  userLocation: string;
  description: string;
  phone: string;
  bookingDate: string;
  bookingTime: string;
  bookingStatus: string;
  paymentId: {
    _id: string;
    paymentMethod: string;
    paymentInfo: {
      stripePaymentIntentId: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface ITransaction {
  _id: string;
  vendorId: {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    profileImage: string;
  };
  amount: number;
  paymentMethod: string;
  transactionType: string;
  forWithdrawStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { IEarning, ITransaction };
