export interface IReview {
  id?: number;
  rating: number;
  comment: string;
  product_id: number;
  user_id: number;

  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}
