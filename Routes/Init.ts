import { Router } from 'express';
import { pipe } from 'fp-ts/lib/function';
import { prisma } from '../';
import * as TE from 'fp-ts/lib/TaskEither'
import jwt_decode from "jwt-decode";


export const InitRoutes = Router();

/**
 * POST /api/init
 *  @tags Init
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

// Create
InitRoutes.get('/', async (req: any, res, next) => await pipe(
    TE.tryCatch(
        async () => {
            let token: { id: string } = jwt_decode(req.headers.authorization.split(' ')[1]);

            res.status(200).send(await prisma.user.findUnique({
                where: {
                    id: parseInt(token.id)
                },
                select:{
                    email: true,
                    id: true,
                    password: false
                }
            }));

        },
        (e) => next(e)
    )()
))
