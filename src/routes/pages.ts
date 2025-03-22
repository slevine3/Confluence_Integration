import { Router } from 'express';
import { param } from 'express-validator';
import * as pagesController from '../controllers/pages';
import { validateRequest } from '../middleware';

const router = Router();

router.get('/', pagesController.getPages);

router.get(
  '/:pageId',
  [
    param('pageId').isString().notEmpty().withMessage('pageId is required')
  ],
  validateRequest,
  pagesController.getPageById
);

export default router; 