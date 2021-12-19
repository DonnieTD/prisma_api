
import { Request, Response } from 'express';
import { prisma } from '../../';
import bcrypt from 'bcrypt';
import * as TE from 'fp-ts/lib/TaskEither'
import { ErrorToText } from '../../lib';



export const registerCallback = ({ body: { email, password } }: Request, res: Response) => TE.tryCatch(
    async () => {
        if (
            await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
        ) throw new Error('Email/User already exists')

        let newUser = await prisma.user.create({
            data: {
                email: email,
                password: await bcrypt.hash(password, 10),
            },
        });

        res.send(newUser);
    },
    (e) => res.send(ErrorToText(e as Error))
)()