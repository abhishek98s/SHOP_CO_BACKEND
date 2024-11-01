import knex from '../../config/knex.config';
import { IProduct, ISellingProduct } from './product.model';

export const fetchNewSellingProducts = async (): Promise<ISellingProduct[]> => {
  return await knex('products')
    .select(
      'id',
      'name',
      'rating',
      'price',
      'discount',
      'discounted_price',
      'image_url',
    )
    .where('category_id', 1);
};

export const fetchTopSellingProducts = async (): Promise<ISellingProduct[]> => {
  return await knex('products')
    .select(
      'id',
      'name',
      'rating',
      'price',
      'discount',
      'discounted_price',
      'image_url',
    )
    .where('category_id', 2);
};

export const fetchProductDetail = async (productId: number) => {
  return await knex('products')
    .select(
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
    .join('product_styles', 'products.style_id', 'product_styles.id')
    .where('products.id', productId);
};

export const create = async (
  productData: IProduct,
): Promise<{ productId: number }> => {
  const product = await knex('products').insert(productData).returning('id');
  return { productId: product[0].id };
};

export const remove = async (productId: number) => {
  return await knex('users').where('id', productId).delete();
};
