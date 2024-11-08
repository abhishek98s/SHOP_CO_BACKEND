import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as SizeService from './size.service';
import { sizeSuccessMessages } from './constant/sizeSuccessMessages';
import { customHttpError } from '../../utils/customErrorHandler';
import { sizeErrorMessages } from './constant/sizeErrorMessages';
import { ISize } from './size.model';

export const getSizes = async (req: Request, res: Response) => {
  const result = await SizeService.getSizes();

  res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const postSize = async (req: Request, res: Response) => {
  const { name, user } = req.body;

  await SizeService.postSize(name, user.username);

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: sizeSuccessMessages.CREATED_SUCCESS });
};

export const patchSize = async (req: Request, res: Response) => {
  const sizeId = parseInt(req.params.id);
  const { name, user } = req.body;

  if (isNaN(sizeId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      sizeErrorMessages.INVALID_ID,
    );

  const sizeObj: ISize = {
    name,
    updated_by: user.username,
  };

  await SizeService.patchSizeById(sizeId, sizeObj);

  res.status(StatusCodes.OK).json({
    success: true,
    message: sizeSuccessMessages.PATCH_SUCCESS,
  });
};

export const deleteSize = async (req: Request, res: Response) => {
  const sizeId = parseInt(req.params.id);

  if (isNaN(sizeId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      sizeErrorMessages.INVALID_ID,
    );

  await SizeService.deleteSize(sizeId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: sizeSuccessMessages.DELETE_SUCCESS,
  });
};
