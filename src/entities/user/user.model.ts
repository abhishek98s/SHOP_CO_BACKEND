export interface UserModel {
  id?: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  image_url: string;
  role: 'seller' | 'user' | 'admin';
  updated_by?: string;
  created_by?: string;
  updated_at?: string;
  created_at?: string;
}
