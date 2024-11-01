import { Request, Response } from 'express';import { StatusCodes } from 'http-status-codes';

import { productErrorMessages } from './constants/productErrorMessages';
import * as ProductService from './product.service';
import { IProduct } from './product.model';
import { productSuccessMessages } from './constants/productSuccessMessages';

export const getNewSellingProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getNewSellingProducts();

    return res.status(StatusCodes.OK).json({ success: true, data: result });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
};

export const getTopSellingProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getTopSellingProducts();

    return res.status(StatusCodes.OK).json({ success: true, data: result });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    if (!productId) throw new Error(productErrorMessages.MISSING_ID);

    const result = await ProductService.getProductDetail(productId);

    return res.status(StatusCodes.OK).json({ success: true, data: result });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, rating, price, stock_quantity, user } = req.body;
    let isImage = false;

    if (!name || !description || !rating || !price || !stock_quantity) {
      throw new Error(productErrorMessages.INPUT_REQUIRED);
    }

    const productObj: IProduct = {
      name,
      description,
      rating,
      price,
      stock_quantity,
      image_id: null,
      category_id: 3,
    };

    if (!req.file) {
      await ProductService.postProduct(isImage, productObj, user.name);
    } else {
      isImage = true;
      const imagePath = req.file!.path;
      const imageName = req.file!.originalname;

      await ProductService.postProduct(
        isImage,
        productObj,
        user.name,
        imagePath,
        imageName,
      );
    }

    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: productSuccessMessages.POST_SUCCESS });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
};
