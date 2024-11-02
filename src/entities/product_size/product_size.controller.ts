import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { productSizeExceptionMessages } from './constant/productSizeExceptionMessages';
import { productSizeSuccessMessages } from './constant/productSizeSuccessMessages';
import * as ProductSizeService from './product_size.service';
import { IProduct_size } from './product_size.model';

export const postProductSize = async (req: Request, res: Response) => {
  try {
    const { product_id, size_id, user } = req.body;

    if (!product_id || !size_id)
      throw new Error(productSizeExceptionMessages.PRODUCT_SIZE_ID_REQUIRED);

    const productSizeObj: IProduct_size = {
      product_id,
      size_id,
      created_by: user.username,
      updated_by: user.username,
    };

    await ProductSizeService.postProductSize(productSizeObj);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: productSizeSuccessMessages.POST_SUCCESS,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
};
