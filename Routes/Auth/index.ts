
import { Router } from 'express';
import { authorize } from '../../middleware/authorize';
import { loginCallback } from './Login';
import { registerCallback } from './Register';

export const AuthRoutes = Router();

/**
 * POST /api/auth/login
 *  @tags Auth
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */

AuthRoutes.post('/login', loginCallback);

/**
 * POST /api/auth/register
 *  @tags Auth
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
AuthRoutes.post('/register', authorize, registerCallback);