export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  image_id: number | null;
  role: 'seller' | 'user' | 'admin';
  updated_by?: string;
  created_by?: string;
  updated_at?: string;
  created_at?: string;
}

export interface IUpdateUser {
  username: string;
  password: string;
  image_id: number | null;
  updated_by: string;
}

export interface IReturnUser {
  id?: string;
  username: string;
  email: string;
  phone: string;
  image_url?: string | null;

  password?: string;
  image_id?: number | null;
  updated_by?: string;
}
