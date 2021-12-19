import { Router } from 'express';
import { pipe } from 'fp-ts/lib/function';
import { prisma } from '../../';
import * as TE from 'fp-ts/lib/TaskEither'
import { authorize } from '../../middleware/authorize';
import { ratelimit } from '../../middleware/ratelimit';

export const EnquiriesRoutes = Router();

/**
 * POST /api/enquiries
 *  @tags Enquiries
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

// Create
EnquiriesRoutes.post('/', ratelimit(4, 1440), async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.enquiries.create({
            data: {
                email: req.body.email,
                subject: req.body.subject,
                message: req.body.message
            }
        })),
        (e) => next(e)
    )()
))

/**
 * Get /api/enquiries
 *  @tags Enquiries
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

// Read
EnquiriesRoutes.get('/', authorize, async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.enquiries.findMany()),
        (e) => next(e)
    ))()
);

/**
 * Patch /api/enquiries/:id
 *  @tags Enquiries
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
// Update
EnquiriesRoutes.patch('/:id', authorize, async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.enquiries.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body
        })),
        (e) => next(e)
    )()
))

/**
 * POST /api/enquiries/:id
 *  @tags Enquiries
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
EnquiriesRoutes.delete('/:id', authorize, async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.enquiries.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })),
        (e) => next(e)
    )()
))


