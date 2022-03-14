import { Router } from 'express';

import { postRouter } from './post.routes';
import { userRoutes } from './user.routes';

export const router = Router();

router.use('/user', userRoutes);
router.use('/post', postRouter);
