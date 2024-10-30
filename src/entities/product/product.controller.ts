import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { productErrorMessages } from './constants/productErrorMessages';
import * as ProductService from './product.service';


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
