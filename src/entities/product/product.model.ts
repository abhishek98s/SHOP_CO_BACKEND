export interface ISellingProduct {
  id?: number;
  name: string;
  rating: number | 0;
  price: number;
  discount?: number;
  discounted_price?: number;
  sizes: string;

  image_url: string;
}

export interface IProduct {
  id?: number;
  name: string;
  rating: number | 0;
  price: number;
  discount?: number;
  discounted_price?: number;

  description: string;
  stock_quantity: number | 0;
  tags?: string[];

  image_id: number | null;
  category_id: number;
  style_id: number;
  type_id: number;

  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IProductUser {
  name: string;
  rating: number | 0;
  price: number;
  discount?: number;
  discounted_price?: number;

  description: string;
  stock_quantity: number | 0;

  image_id: number | null;
  category_id: number;

  created_by?: string;
  updated_by?: string;
}

export type TSize =
  | 'XX-Small'
  | 'X-Small'
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'X-Large'
  | 'XX-Large';
