export interface Password {
  _id: string;
  user_id: string;
  password: string;
  createdAt: Date;
  createdBy: string | null;
  updatedAt: Date;
  updatedBy: string | null;
}
