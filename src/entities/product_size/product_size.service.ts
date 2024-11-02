import { IProduct_size } from './product_size.model';
import * as ProductSizeDAO from './product_size.repository';

export const postProductSize = async (productSizeObj: IProduct_size) => {
  return await ProductSizeDAO.create(productSizeObj);
};
