import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { productErrorMessages } from './constants/productErrorMessages';
import * as ProductService from './product.service';
import { IProductUser } from './product.model';
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
    const {
      name,
      description,
      rating,
      price,
      stock_quantity,
      discount,
      discounted_price,

      category,
      style,
      type,
      user,
    } = req.body;
    let isImage = false;

    if (!name || !description || !rating || !price || !stock_quantity) {
      throw new Error(productErrorMessages.INPUT_REQUIRED);
    }

    const productObj: IProductUser = {
      name,
      description,
      rating: parseInt(rating),
      price: parseInt(price),
      stock_quantity: parseInt(stock_quantity),
      discount: discount ? discount : 0,
      discounted_price: discounted_price ? discounted_price : 0,

      image_id: null,
      category_id: 3,

      created_by: user.username,
      updated_by: user.username,
    };

    if (!req.file) {
      await ProductService.postProduct(
        isImage,
        productObj,
        user.name,
        category,
        style,
        type,
      );
    } else {
      isImage = true;
      const imagePath = req.file!.path;
      const imageName = req.file!.originalname;

      await ProductService.postProduct(
        isImage,
        productObj,
        user.name,
        category,
        style,
        type,
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

export const patchProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);

    const {
      name,
      description,
      rating,
      price,
      stock_quantity,
      discount,
      discounted_price,
      category,
      style,
      type,
      user,
    } = req.body;

    let isImage = false;

    const productObj: Partial<IProductUser> = {
      updated_by: user.username,
    };

    Object.assign(productObj, {
      ...(name && { name }),
      ...(description && { description }),
      ...(rating && { rating }),
      ...(price && { price }),
      ...(stock_quantity && { stock_quantity }),
      ...(discount && { discount }),
      ...(discounted_price && { discounted_price }),
      ...(category && { category }),
      ...(style && { style }),
      ...(type && { type }),
    });

    if (!req.file) {
      await ProductService.patchProduct(
        isImage,
        productObj,
        productId,
        user.username,
      );
    } else {
      isImage = true;
      const imagePath = req.file.path;
      const imageName = req.file.originalname;
      await ProductService.patchProduct(
        isImage,
        productObj,
        productId,
        user.username,
        imagePath,
        imageName,
      );
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: productSuccessMessages.PATCH_SUCCESS });

    // update the databsae witht productObj
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);

    if (!productId) throw new Error(productErrorMessages.MISSING_ID);

    await ProductService.deleteProduct(productId);

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: productSuccessMessages.DELETE_SUCCESS });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
};
