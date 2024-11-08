import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as TypeService from './type.service';
import { typeSuccessMessages } from './constant/typeSuccessMessages';
import { customHttpError } from '../../utils/customErrorHandler';
import { typeErrorMessages } from './constant/typeErrorMessages';
import { IType } from './type.model';

export const getTypes = async (req: Request, res: Response) => {
  const result = await TypeService.getTypes();

  res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const postType = async (req: Request, res: Response) => {
  const { name, user } = req.body;

  await TypeService.postType(name, user.username);

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: typeSuccessMessages.CREATED_SUCCESS });
};

export const patchType = async (req: Request, res: Response) => {
  const typeId = parseInt(req.params.id);
  const { name, user } = req.body;

  if (isNaN(typeId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      typeErrorMessages.INVALID_ID,
    );

  const typeObj: IType = {
    name,
    updated_by: user.username,
  };

  await TypeService.patchTypeById(typeId, typeObj);

  res.status(StatusCodes.OK).json({
    success: true,
    message: typeSuccessMessages.PATCH_SUCCESS,
  });
};

export const deleteType = async (req: Request, res: Response) => {
  const typeId = parseInt(req.params.id);

  if (isNaN(typeId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      typeErrorMessages.INVALID_ID,
    );

  await TypeService.deleteType(typeId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: typeSuccessMessages.DELETE_SUCCESS,
  });
};
