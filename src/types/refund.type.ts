interface IRefund {
  _id: string;
  bookingId: string;
  refundedBy: string;
  refundReason: string;
  previousBookingStatus: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    profileImage: string;
  };
  vendorId: {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    profileImage: string;
  };
  refundedAmount: number;
  refundedPercentage: number;
  adminAmount: number;
  vendorAmount: number;
  refundStatus: string;
  createdAt: string;
  updatedAt: string;
}

export type { IRefund };
