interface IFeedback {
  _id: string;
  bookingId: string;
  rater: null | {
    _id: string;
    fullName: string;
    email: string;
    profileImage: string;
    badgeId: string | null;
  };
  ratee: {
    _id: string;
    fullName: string;
    email: string;
    profileImage: string;
    badgeId: string | null;
  };
  vendorServiceId: {
    _id: string;
    coverPhotos: string[];
    serviceTitle: string;
    categoryId: string;
    homeRate: number;
    officeRate: number;
    villageRate: number;
  };
  RaterRole: string;
  RateeRole: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export type { IFeedback };
