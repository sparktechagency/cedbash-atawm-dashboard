interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  bio: string;
  profileImage: string;
  dob: string | null;
  gender: string;
  phone: string;
  address: string;
  nidDocuments: string[];
  isBlocked: boolean;
  badgeId: string | null;
  createdAt: string;
}
interface IVendorUser {
  _id: string;
  fullName: string;
  email: string;
  role: "vendor";
  bio: string;
  profileImage: string;
  dob: string; // ISO date string
  gender: "male" | "female" | "other";
  phone: string;
  address: string;
  nidDocuments: string[];
  badgeId: string;
  createdAt: string; // ISO date string
  totalRatings: number;
  averageRating: number;
}

export type { IUser, IVendorUser };
