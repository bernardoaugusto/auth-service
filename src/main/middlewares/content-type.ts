/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from "express";

export const contentType = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.type("json");
    next();
};
