interface IJwtPayload {
  fullName: string;
  email: string;
  phone: string;
  userId: string;
  role: "super_admin" | "admin" | string;
  iat: number;
  exp: number;
}

export type { IJwtPayload };
