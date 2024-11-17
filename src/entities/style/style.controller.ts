import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as StyleService from './style.service';
import { styleSuccessMessages } from './constant/styleSuccessMessages';
import { customHttpError } from '../../utils/customErrorHandler';
import { styleErrorMessages } from './constant/styleErrorMessages';
import { IStyle } from './style.model';

export const getStyles = async (req: Request, res: Response) => {
  const result = await StyleService.getStyles();

  res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const postStyle = async (req: Request, res: Response) => {
  const { name, user } = req.body;

  await StyleService.postStyle(name, user.username);

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: styleSuccessMessages.CREATED_SUCCESS });
};

export const patchStyle = async (req: Request, res: Response) => {
  const styleId = parseInt(req.params.id);
  const { name, user } = req.body;

  if (isNaN(styleId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      styleErrorMessages.INVALID_ID,
    );

  const styleObj: IStyle = {
    name,
    updated_by: user.username,
  };

  await StyleService.patchStyleById(styleId, styleObj);

  res.status(StatusCodes.OK).json({
    success: true,
    message: styleSuccessMessages.PATCH_SUCCESS,
  });
};

export const deleteStyle = async (req: Request, res: Response) => {
  const styleId = parseInt(req.params.id);

  if (isNaN(styleId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      styleErrorMessages.INVALID_ID,
    );

  await StyleService.deleteStyle(styleId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: styleSuccessMessages.DELETE_SUCCESS,
  });
};
