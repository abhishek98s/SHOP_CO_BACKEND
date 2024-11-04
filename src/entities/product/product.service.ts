import { StatusCodes } from 'http-status-codes';
import {
  IProduct,
  IProductResponse,
  IProductUser,
  ISellingProduct,
  TSize,
} from './product.model';
import * as ProductDAO from './product.repository';
import * as ProductSizesDAO from '../product_size/product_size.repository';
import * as ImageService from '../image/image.service';
import * as ProductSizeService from '../product_size/product_size.service';
import { productErrorMessages } from './constants/productErrorMessages';
import { customHttpError } from '../../utils/customErrorHandler';
import { IProduct_size } from '../product_size/product_size.model';
import {
  categoryMap,
  productTypeMap,
  sizeMap,
  stylesMap,
} from './constants/productMaps';

export const getTopSellingProducts = async () => {
  const products = await ProductDAO.fetchTopSellingProducts();

  return products.map((product: ISellingProduct) => {
    return {
      ...product,
      sizes: product.sizes ? product.sizes.split(',') : [],
    };
  });
};

export const getNewSellingProducts = async () => {
  return await ProductDAO.fetchNewSellingProducts();
};

export const getProductDetail = async (productId: number) => {
  const product = await ProductDAO.fetchProductDetail(productId);

  if (!product)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      productErrorMessages.NOT_FOUND,
    );

  return product;
};

export const postProduct = async (
  isImage: boolean,
  productData: IProductUser,
  username: string,
  categoryName: 'top_selling' | 'new_arrival',
  stylesName: 'casual' | 'formal' | 'party' | 'gym',
  productType: 't-shirts' | 'shorts' | 'shirts' | 'hoodie',
  sizeArr: TSize[],
  imagePath?: string,
  imageName?: string,
) => {
  let image_id = productData.image_id;

  if (isImage) {
    image_id = await ImageService.saveImage(imagePath!, imageName!, username);
  }

  const productObj: IProduct = {
    ...productData,

    category_id: categoryMap.get(categoryName.toLowerCase()) || 3,
    style_id: stylesMap.get(stylesName.toLowerCase()) || 1,
    type_id: productTypeMap.get(productType.toLowerCase()) || 1,

    image_id,
  };

  const product = await ProductDAO.create(productObj);

  if (!product.productId)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      productErrorMessages.POST_FAILED,
    );

  for (const size of sizeArr) {
    const lowerSize = size.toLowerCase();
    const sizeId = sizeMap.get(lowerSize);

    if (!sizeId) return;

    const productSizeObj: IProduct_size = {
      product_id: product.productId,
      size_id: sizeId,
      created_by: username,
      updated_by: username,
    };
    await ProductSizeService.postProductSize(productSizeObj);
  }

  return;
};

export const patchProduct = async (
  isImage: boolean,
  productData: Partial<IProductResponse>,
  productId: number,
  username: string,
  sizeArr: string[],
  imagePath?: string,
  imageName?: string,
) => {
  const currentProduct = await ProductDAO.fetchById(productId);
  if (!currentProduct)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      productErrorMessages.NOT_FOUND,
    );

  const image_id = isImage
    ? await ImageService.saveImage(imagePath!, imageName!, username)
    : currentProduct.image_id;

  const {
    name = currentProduct.name,
    description = currentProduct.description,
    rating = currentProduct.rating,
    price = currentProduct.price,
    stock_quantity = currentProduct.stock_quantity,
    discount = currentProduct.discount,
    discounted_price = currentProduct.discounted_price,
    category,
    style,
    type,
  } = productData;

  const updatedProduct: Partial<IProduct> = {
    name,
    description,
    rating,
    price,
    stock_quantity,
    discount,
    discounted_price,

    category_id:
      categoryMap.get(category!.toLowerCase()) || currentProduct.category_id,
    style_id: stylesMap.get(style!.toLowerCase()) || currentProduct.style_id,
    type_id: productTypeMap.get(type!.toLowerCase()) || currentProduct.type_id,

    image_id,
    updated_by: username,
  };

  const product = await ProductDAO.update(updatedProduct, productId);
  const { productId: updatedProductId } = product;

  if (!updatedProductId)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      productErrorMessages.UPDATE_FAILED,
    );

  const currentProductSizes = currentProduct
    .sizes!.split(',')
    .map((size: string) => size.trim().toLowerCase());
  const userProductSizes = sizeArr.map((size: string) => size.toLowerCase());

  const sizeToRemove = currentProductSizes.filter((size) => {
    return !userProductSizes.includes(size.toLowerCase());
  });

  await Promise.all(
    sizeToRemove.map(async (size) => {
      const sizeId = sizeMap.get(size);
      if (sizeId) {
        await ProductSizesDAO.remove(updatedProductId, sizeId);
      }
    }),
  );

  await Promise.all(
    sizeArr.map(async (size) => {
      const lowerSize = size.toLowerCase();
      const sizeId = sizeMap.get(lowerSize);

      if (!sizeId) return;

      const existingEntry = await ProductSizesDAO.existingEntry(
        updatedProductId,
        sizeId,
      );

      if (!existingEntry) {
        const productSizeObj: IProduct_size = {
          product_id: updatedProductId,
          size_id: sizeId,
          created_by: username,
          updated_by: username,
        };
        await ProductSizeService.postProductSize(productSizeObj);
      }
    }),
  );
};

export const deleteProduct = async (productId: number) => {
  const isProductAvailable = await ProductDAO.fetchById(productId);
  if (!isProductAvailable)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      productErrorMessages.NOT_FOUND,
    );

  return ProductDAO.remove(productId);
};
