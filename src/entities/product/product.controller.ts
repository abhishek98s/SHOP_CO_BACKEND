import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as ProductDAO from './product.service';


export const getProductDetail = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);
        if (!productId) throw new Error('Product id is required');
        const result = await ProductDAO.getProductDetail(productId);
        return res.status(StatusCodes.OK).json({ success: true, data: result });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: (error as Error).message });
    }
};
