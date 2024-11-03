import { StatusCodes } from 'http-status-codes';import { IProduct, IProductUser, TSize } from './product.model';
import * as ProductDAO from './product.repository';
import * as ImageService from '../image/image.service';
import * as ProductSizeService from '../product_size/product_size.service';
import { productErrorMessages } from './constants/productErrorMessages';
import { customHttpError } from '../../utils/customErrorHandler';
import { IProduct_size } from '../product_size/product_size.model';
export const getTopSellingProducts = async () => {
  return await ProductDAO.fetchTopSellingProducts();
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
  const categoryMap = {
    new_arrival: 1,
    top_selling: 2,
  };

  const stylesMap = {
    casual: 1,
    formal: 2,
    party: 3,
    gym: 4,
  };

  const productTypeMap = {
    't-shirts': 1,
    shorts: 2,
    shirts: 3,
    hoodie: 4,
  };

  let image_id = productData.image_id;

  if (isImage) {
    image_id = await ImageService.saveImage(imagePath!, imageName!, username);
  }

  const productObj: IProduct = {
    ...productData,

    category_id: categoryMap[categoryName] | 3,
    style_id: stylesMap[stylesName] | 1,
    type_id: productTypeMap[productType] | 1,

    size_id: 1,

    image_id,
  };

  const product = await ProductDAO.create(productObj);

  if (!product.productId)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      productErrorMessages.POST_FAILED,
    );

  for (const size of sizeArr) {
    const sizeMap: { [key: string]: number } = {
      'xx-small': 1,
      'x-small': 2,
      small: 3,
      medium: 4,
      large: 5,
      'x-large': 6,
      'xx-large': 7,
    };

    const lowerSize = size.toLowerCase();
    const sizeId: number = sizeMap[lowerSize];

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
  productData: Partial<IProduct>,
  productId: number,
  username: string,
  imagePath?: string,
  imageName?: string,
) => {
  const currentProduct = await ProductDAO.fetchById(productId);
  if (!currentProduct)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      productErrorMessages.NOT_FOUND,
    );

  let image_id;

  if (isImage) {
    image_id = await ImageService.saveImage(imagePath!, imageName!, username);
  } else {
    image_id = currentProduct.image_id;
  }

  const updatedProduct: Partial<IProduct> = {
    ...currentProduct,
    ...productData,
    image_id,
    updated_by: username,
  };

  return await ProductDAO.update(updatedProduct, productId);
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
