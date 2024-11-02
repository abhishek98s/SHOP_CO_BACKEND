import { IProduct, IProductUser } from './product.model';
import * as ProductDAO from './product.repository';
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
  productData: IProductUser,
  username: string,
  categoryName: 'top_selling' | 'new_arrival',
  stylesName: 'casual' | 'formal' | 'party' | 'gym',
  productType: 't-shirts' | 'shorts' | 'shirts' | 'hoodie',
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

  if (!product.productId) throw new Error(productErrorMessages.POST_FAILED);

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
  if (!currentProduct) throw new Error(productErrorMessages.NOT_FOUND);

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
  if (!isProductAvailable) throw new Error(productErrorMessages.NOT_FOUND);

  return ProductDAO.remove(productId);
};
