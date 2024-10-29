export interface IProduct {
    id?: number,
    name: string,
    description: string,
    rating: number | 0,
    price: number,
    discount?: number,
    discounted_price?: number,
    image_url: string,
    stock_quantity: number | 0,
    tags?: string[],

    size_id: number;
    category_id: number,
    style_id: number,
    type_id: number,

    created_by?: string,
    updated_by?: string,
    created_at?: string,
    updated_at?: string,
}
