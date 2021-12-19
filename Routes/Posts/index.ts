import { Router } from 'express';
import { pipe } from 'fp-ts/lib/function';
import { prisma } from '../../';
import * as TE from 'fp-ts/lib/TaskEither'
import { authorize } from '../../middleware/authorize';
import { ratelimit } from '../../middleware/ratelimit';

export const PostsRoutes = Router();

/**
 * POST /api/posts
 *  @tags Posts
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

// Create
PostsRoutes.post('/', ratelimit(4, 1440), async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.posts.create({
            data: {
                markdown: req.body.markdown,
                published: req.body.published,
                subject: req.body.subject,
                createdAt: req.body.createdAt,
                id: req.body.id,
                updatedAt: req.body.updatedAt
            }
        })),
        (e) => next(e)
    )()
))

/**
 * Get /api/posts
 *  @tags Posts
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

// Read
PostsRoutes.get('/', authorize, async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.posts.findMany()),
        (e) => next(e)
    ))()
);

/**
 * Patch /api/posts/:id
 *  @tags Posts
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
// Update
PostsRoutes.patch('/:id', authorize, async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.posts.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body
        })),
        (e) => next(e)
    )()
))

/**
 * POST /api/posts/:id
 *  @tags Posts
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
PostsRoutes.delete('/:id', authorize, async (req, res, next) => await pipe(
    TE.tryCatch(
        async () => res.status(200).send(await prisma.posts.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })),
        (e) => next(e)
    )()
))


