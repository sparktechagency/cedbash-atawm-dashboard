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

export type { IUser };
