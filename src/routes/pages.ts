import { Router } from 'express';
import { query, param } from 'express-validator';
import * as pagesController from '../controllers/pages';

const router = Router();

router.get(
  '/',
  [
    query('spaceKey').isString().notEmpty().withMessage('spaceKey is required'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
    query('start').optional().isInt({ min: 0 }).withMessage('start must be a non-negative integer')
  ],
  pagesController.getPages
);

router.get(
  '/:pageId',
  [
    param('pageId').isString().notEmpty().withMessage('pageId is required')
  ],
  pagesController.getPageById
);

export default router; 