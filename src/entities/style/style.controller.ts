import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as StyleService from './style.service';
import { styleSuccessMessages } from './constant/styleSuccessMessages';
import { customHttpError } from '../../utils/customErrorHandler';
import { styleErrorMessages } from './constant/styleErrorMessages';
import { IStylee } from './style.model';

export const getStylees = async (req: Request, res: Response) => {
  const result = await StyleeService.geStyleles();

  res.status(StatusCodes.OK).json({ success: true, data: result });
};

export const postStylee = async (req: Request, res: Response) => {
  const { name, user } = req.body;

  await StyleeService.posStylele(name, user.username);

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: styleSuccessMessages.CREATED_SUCCESS });
};

export const patchStylee = async (req: Request, res: Response) => {
  const styleId = parseInt(req.params.id);
  const { name, user } = req.body;

  if (isNaN(styleId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      styleErrorMessages.INVALID_ID,
    );

  const styleObj: IStylee = {
    name,
    updated_by: user.username,
  };

  await StyleeService.patcStyleleById(styleId, styleObj);

  res.status(StatusCodes.OK).json({
    success: true,
    message: styleSuccessMessages.PATCH_SUCCESS,
  });
};

export const deleteStylee = async (req: Request, res: Response) => {
  const styleId = parseInt(req.params.id);

  if (isNaN(styleId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      styleErrorMessages.INVALID_ID,
    );

  await StyleeService.deletStylele(styleId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: styleSuccessMessages.DELETE_SUCCESS,
  });
};
