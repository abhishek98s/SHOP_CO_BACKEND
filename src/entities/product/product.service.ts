import { IProduct } from './product.model';import * as ProductDAO from './product.repository';
import * as ImageService from '../image/image.service';
import { productErrorMessages } from './constants/productErrorMessages';

export const getTopSellingProducts = async () => {
  return await ProductDAO.fetchTopSellingProducts();
};

export const getNewSellingProducts = async () => {
  return await ProductDAO.fetchNewSellingProducts();
};

export const getProductDetail = async (productId: number) => {
  return await ProductDAO.fetchProductDetail(productId);
};

export const postProduct = async (
  isImage: boolean,
  productData: IProduct,
  username: string,
  imagePath?: string,
  imageName?: string,
) => {
  let image_id = productData.image_id;

  if (isImage) {
    image_id = await ImageService.saveImage(imagePath!, imageName!, username);
  }

  const productObj = {
    ...productData,
    image_id,
  };

  const product = await ProductDAO.create(productObj);

  if (!product.productId) throw new Error(productErrorMessages.POST_FAILED);

  return;
};
