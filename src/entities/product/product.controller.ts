import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { productErrorMessages } from './constants/productErrorMessages';
import * as ProductService from './product.service';
import { IProductResponse, IProductUser } from './product.model';
import { productSuccessMessages } from './constants/productSuccessMessages';
import { customHttpError } from '../../utils/customErrorHandler';
export const getAllProducts = async (req: Request, res: Response) => {
  const { minPrice, maxPrice, type = '', style = '', sizes = '' } = req.query;

  const conMinPrice = parseInt(minPrice as string);
  const conMaxPrice = parseInt(maxPrice as string);

  if (!conMinPrice || !conMaxPrice)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productErrorMessages.MIN_MAX_REUIQRED,
    );

  if (conMinPrice < 0 || conMaxPrice < 0 || conMinPrice > conMaxPrice) {
    throw new Error('Invalid price range');
  }

  const productSizes = (sizes as string)
    .split(',')
    .map((size) => {
      if (size.trim().length > 1) {
        return size.toLowerCase();
      }
    })
    .filter((item): item is string => item !== undefined);

  const result = await ProductService.filterProducts(
    conMinPrice,
    conMaxPrice,
    type as string,
    style as string,
    productSizes,
  );

  return res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const getNewSellingProducts = async (req: Request, res: Response) => {
  const result = await ProductService.getNewSellingProducts();
  return res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const getTopSellingProducts = async (req: Request, res: Response) => {
  const result = await ProductService.getTopSellingProducts();

  return res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const getProductDetail = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  if (!productId)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productErrorMessages.MISSING_ID,
    );

  const result = await ProductService.getProductDetail(productId);

  return res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const postProduct = async (req: Request, res: Response) => {
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
    size,
    user,
  } = req.body;
  let isImage = false;

  if (!name || !description || !rating || !price || !stock_quantity) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productErrorMessages.INPUT_REQUIRED,
    );
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
      user.username,
      category,
      style,
      type,
      size,
    );
  } else {
    isImage = true;
    const imagePath = req.file!.path;
    const imageName = req.file!.originalname;

    await ProductService.postProduct(
      isImage,
      productObj,
      user.username,
      category,
      style,
      type,
      size,
      imagePath,
      imageName,
    );
  }

  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: productSuccessMessages.POST_SUCCESS });
};

export const patchProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  if (!productId)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productErrorMessages.MISSING_ID,
    );

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
    size,
    user,
  } = req.body;

  let isImage = false;

  const productObj: Partial<IProductResponse> = {
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
      size,
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
      size,
      imagePath,
      imageName,
    );
  }

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: productSuccessMessages.PATCH_SUCCESS });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  if (!productId)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productErrorMessages.MISSING_ID,
    );

  await ProductService.deleteProduct(productId);

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: productSuccessMessages.DELETE_SUCCESS });
};
