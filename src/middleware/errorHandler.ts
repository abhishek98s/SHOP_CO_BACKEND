import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: { status: number }, req: Request, res: Response, next: NextFunction) => {

    if (err.status === 400 && err instanceof SyntaxError && 'body' in err) {
        return res.status(HttpStatusCode.BadRequest).json({ success: false, message: 'Invalid JSON format' });
    }

    return res.status(HttpStatusCode.InternalServerError).json({ success: false, message: 'Internal Server Error' });
};

export default errorHandler;
