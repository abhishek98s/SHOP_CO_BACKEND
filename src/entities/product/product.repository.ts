import knex from '../../config/knex.config';import { IProduct, ISellingProduct } from './product.model';export const fetchById = async (productId: number): Promise<IProduct> => {  return await knex('products')    .select(      'products.id',      'products.name',      'products.rating',
      'products.price',
      'products.stock_quantity',
      'products.discount',
      'products.discounted_price',
      'products.image_id',
      'products.category_id',
      'products.style_id',
      'products.type_id',
      // eslint-disable-next-line quotes
      knex.raw("STRING_AGG(sizes.name, ', ') as sizes"),
    )
    .leftJoin('products_sizes', 'products.id', 'products_sizes.product_id')
    .leftJoin('sizes', 'products_sizes.size_id', 'sizes.id')

    .where('products.id', productId)
    .groupBy('products.id')
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
      // eslint-disable-next-line quotes
      knex.raw("STRING_AGG(sizes.name, ', ') as sizes"),
      // eslint-disable-next-line quotes
      knex.raw("STRING_AGG(sizes.name, ', ') as sizes"),
    )
    .leftJoin('images', 'products.image_id', 'images.id')
    .leftJoin('products_sizes', 'products.id', 'products_sizes.product_id')
    .leftJoin('sizes', 'products_sizes.size_id', 'sizes.id')
    .where('products.category_id', 1)
    .groupBy('products.id', 'images.url');
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
      // eslint-disable-next-line quotes
      knex.raw("STRING_AGG(sizes.name, ', ') as sizes"),
    )
    .leftJoin('images', 'products.image_id', 'images.id')
    .leftJoin('products_sizes', 'products.id', 'products_sizes.product_id')
    .leftJoin('sizes', 'products_sizes.size_id', 'sizes.id')
    .where('products.category_id', 2)
    .groupBy('products.id', 'images.url');
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

      // eslint-disable-next-line quotes
      knex.raw("STRING_AGG(sizes.name, ', ') as sizes"),
    )
    .leftJoin('images', 'products.id', 'images.id')
    .leftJoin('products_sizes', 'products.id', 'products_sizes.product_id')
    .leftJoin('sizes', 'products_sizes.size_id', 'sizes.id')

    .join('product_styles', 'products.style_id', 'product_styles.id')
    .where('products.id', productId)
    .groupBy('products.id', 'images.url', 'product_styles.name')
    .first();
};

export const create = async (
  productData: IProduct,
): Promise<{ productId: number }> => {
  const product = await knex('products').insert(productData).returning('id');
  return { productId: product[0].id };
};

export const update = async (
  productData: Partial<IProduct>,
  productId: number,
): Promise<{ productId: number }> => {
  const product = await knex('products')
    .update(productData)
    .where('id', productId)
    .returning('id');
  return { productId: product[0].id };
};

export const remove = async (productId: number) => {
  return await knex('products').delete().where('id', productId);
};

export const filter = async (
  minPrice: number,
  maxPrice: number,
  type_id: number,
  style_id: number,
  size_ids: number[],
) => {
  return await knex('products')
    .select(
      'products.id',
      'products.name AS product_name',
      'products.price',
      'products.rating',
      'products.discount',
      // eslint-disable-next-line quotes
      knex.raw("STRING_AGG(sizes.name, ', ') AS size_names"),
    )
    .leftJoin('products_sizes', 'products.id', 'products_sizes.product_id')
    .leftJoin('sizes', 'products_sizes.size_id', 'sizes.id')
    .where('products.type_id', type_id)
    .andWhere('products.style_id', style_id)
    .andWhereBetween('products.price', [minPrice, maxPrice])
    .whereIn('products_sizes.size_id', size_ids)
    .groupBy('products.id');
};
