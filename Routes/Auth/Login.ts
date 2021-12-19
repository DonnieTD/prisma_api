
import { Request, Response } from 'express';
import { prisma, accessTokenSecret } from '../../';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as TE from 'fp-ts/lib/TaskEither'
import { fold } from 'fp-ts/lib/Either';
import { User } from '.prisma/client';
import { ErrorToText } from '../../lib';

const GetUserByEmail = (email: string) => TE.tryCatch<Error, User>(
    async () => await prisma.user.findUnique({ where: { email: email }, rejectOnNotFound: true }),
    () => new Error('Invalid User')
);

const CheckPassword = (userPassword: string) => (inputPassword: string) => TE.tryCatch(
    async () => await bcrypt.compare(inputPassword, userPassword),
    (e) => new Error('Invalid Password')
)()

export const loginCallback = async ({ body: { email, password } }: Request, res: Response) => {
    const User = fold<Error, User, User | Error>((e) => e, (x) => x)(await GetUserByEmail(email)());

    if (User instanceof Error) return res.status(401).send(ErrorToText(User));

    const ValidPw = fold<Error, Boolean, Boolean | Error>((e) => e, (x) => x)(await CheckPassword(User.password)(password));

    if (ValidPw instanceof Error) return res.status(401).send(ErrorToText(ValidPw));

    res.status(200).json({
        token: jwt.sign({ id: User.id }, accessTokenSecret)
    });
}
