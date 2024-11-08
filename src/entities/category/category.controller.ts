import { Request, Response } from 'express';import { StatusCodes } from 'http-status-codes';
import * as CategoryService from './category.service';
import { categorySuccessMessages } from './constant/categorySuccessMessages';
import { categoryErrorMessages } from './constant/categoryErrorMessages';
import { customHttpError } from '../../utils/customErrorHandler';
import { ICategory } from './category.model';

export const getCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getcategories();
  res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const postCategory = async (req: Request, res: Response) => {
  const { name, user } = req.body;

  await CategoryService.postCategory(name, user.username);

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: categorySuccessMessages.CREATED_SUCCESS });
};

export const patchCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  const { name, user } = req.body;

  if (isNaN(categoryId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      categoryErrorMessages.INVALID_ID,
    );

  const categoryObj: ICategory = {
    name,
    updated_by: user.username,
  };

  await CategoryService.patchCategoryById(categoryId, categoryObj);

  res.status(StatusCodes.OK).json({
    success: true,
    message: categorySuccessMessages.PATCH_SUCCESS,
  });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);

  if (isNaN(categoryId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      categoryErrorMessages.INVALID_ID,
    );

  await CategoryService.deleteCategory(categoryId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: categorySuccessMessages.DELETE_SUCCESS,
  });
};
