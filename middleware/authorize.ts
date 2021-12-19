import { Request, Response, NextFunction } from "express";
import { fold } from "fp-ts/lib/Either";
import { DecodeJwt } from "../lib";

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return res.sendStatus(401);

    let decodedOrError = fold<Error, string | object, string | object | Error>(
        (e) => e,
        (x) => x
    )(await DecodeJwt(req.headers.authorization))

    return decodedOrError instanceof Error ? res.sendStatus(403) : next();
};