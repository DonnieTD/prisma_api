import { Router } from 'express';
import { pipe } from 'fp-ts/lib/function';
import { prisma } from '../';
import * as TE from 'fp-ts/lib/TaskEither'

export const UserRoutes = Router();

/**
 * POST /api/users
 *  @tags users
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

// Create
UserRoutes.post('/', async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password
            }
        })),
        (e) => next(e)
    )()
))

/**
 * GET /api/users
 *  @tags users
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

// Read
UserRoutes.get('/', async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.user.findMany()),
        (e) => next(e)
    ))()
);

/**
 * PATCH /api/users/:id
 *  @tags users
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

// Update
UserRoutes.patch('/:id', async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.user.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body
        })),
        (e) => next(e)
    )()
))

/**
 * DELETE /api/users/:id
 * @tags users
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
UserRoutes.delete('/:id', async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.user.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })),
        (e) => next(e)
    )()
))


