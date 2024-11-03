import knex from '../../config/knex.config';
import { IProduct, ISellingProduct } from './product.model';
export const fetchById = async (productId: number): Promise<IProduct> => {
  return await knex('products')
    .select('name', 'image_id')
    .where('id', productId)
    .first();
};

export const fetchNewSellingProducts = async (): Promise<ISellingProduct[]> => {
  return await knex('products')
    .select(
      'products.id',
      'products.name',
      'products.rating',
      'products.price',
      'products.discount',
      'products.discounted_price',
      'images.url as image_url',
    )
    .leftJoin('images', 'products.id', 'images.id')
    .where('category_id', 1);
};

export const fetchTopSellingProducts = async (): Promise<ISellingProduct[]> => {
  return await knex('products')
    .select(
      'products.id',
      'products.name',
      'products.rating',
      'products.price',
      'products.discount',
      'products.discounted_price',
      'images.url as image_url',
    )
    .leftJoin('images', 'products.id', 'images.id')
    .where('category_id', 2);
};

export const fetchProductDetail = async (productId: number) => {
  return await knex('products')
    .select(
      'products.id',
      'products.name',
      'products.description',
      'products.rating',
      'products.price',
      'products.discount',
      'products.discounted_price',
      'images.url as image_url',
      'products.stock_quantity',
      'product_styles.name as style_name',
    )
    .leftJoin('images', 'products.id', 'images.id')
    .join('product_styles', 'products.style_id', 'product_styles.id')
    .where('products.id', productId)
    .first();
};

export const create = async (
  productData: IProduct,
): Promise<{ productId: number }> => {
  console.log(productData);

  const product = await knex('products').insert(productData).returning('id');
  return { productId: product[0].id };
};

export const update = async (
  productData: Partial<IProduct>,
  productId: number,
) => {
  return await knex('products').update(productData).where('id', productId);
};

export const remove = async (productId: number) => {
  return await knex('products').delete().where('id', productId);
};
