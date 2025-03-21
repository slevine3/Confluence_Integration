import { Router } from 'express';
import { param } from 'express-validator';
import * as pagesController from '../controllers/pages';

const router = Router();

router.get('/', pagesController.getPages);


router.get(
  '/:pageId',
  [
    param('pageId').isString().notEmpty().withMessage('pageId is required')
  ],
  pagesController.getPageById
);

export default router; 