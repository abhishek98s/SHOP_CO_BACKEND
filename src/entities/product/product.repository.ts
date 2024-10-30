import knex from 'knex';
import { ISellingProduct } from './product.model';

export const fetchTopSellingProducts = async (): Promise<ISellingProduct[]> => {
    return await knex('products').select('id', 'name', 'rating', 'price', 'discount', 'discounted_price', 'image_url').where('category_id', 2);
};

export const fetchNewSellingProducts = async (): Promise<ISellingProduct[]> => {
    return await knex('products').select('id', 'name', 'rating', 'price', 'discount', 'discounted_price', 'image_url').where('category_id', 1);
};

export const fetchProductDetail = async (productId: number) => {
    return await knex('products').select(
        'products.id',
        'products.name as product_name',
        'products.description',
        'products.rating',
        'products.price',
        'products.discount',
        'products.discounted_price',
        'products.image_url',
        'products.stock_quantity',
        'product_styles.name as style_name',
    )
        .join('product_style', 'products.style_id', 'product_style.id')
        .where('products.id', productId);
};
