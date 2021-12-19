import { accessTokenSecret } from "../..";
import * as TE from 'fp-ts/lib/TaskEither';
import jwt from 'jsonwebtoken';

export const DecodeJwt = (x: string) => TE.tryCatch<Error, string | object>(
    async () => await jwt.verify(x.split(' ')[1], accessTokenSecret),
    () => new Error('Invalid Jwt')
)();