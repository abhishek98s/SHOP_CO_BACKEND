import { StatusCodes } from 'http-status-codes';
import { customHttpError } from '../../utils/customErrorHandler';
import { ICategory } from './category.model';
import * as CategoryDAO from './category.repository';
import { categoryErrorMessages } from './constant/categoryErrorMessages';

export const getcategories = async (): Promise<ICategory[]> => {
  return await CategoryDAO.fetchAll();
};

export const postCategory = async (name: string, username: string) => {
  const isCategoryAvailable = await CategoryDAO.fetchByName(name);

  if (isCategoryAvailable)
    throw new customHttpError(
      StatusCodes.CONFLICT,
      categoryErrorMessages.DUPLICATE_NAME,
    );

  const categoryObj: ICategory = {
    name,
    created_by: username,
    updated_by: username,
  };
  return await CategoryDAO.create(categoryObj);
};

export const patchCategoryById = async (categoryId: number, categoryData: ICategory) => {
  const currentCategory = await CategoryDAO.fetchById(categoryId);

  if (!currentCategory)
    throw new customHttpError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      categoryErrorMessages.DOESNOT_EXIST,
    );

  return await CategoryDAO.update(categoryId, categoryData);
};

export const deleteCategory = async (categoryId: number) => {
  const currentCategory = await CategoryDAO.fetchById(categoryId);

  if (!currentCategory)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      categoryErrorMessages.DOESNOT_EXIST,
    );

  return await CategoryDAO.remove(categoryId);
};
