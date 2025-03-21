import { Router } from 'express';
import { query, param } from 'express-validator';
import * as spacesController from '../controllers/spaces';

const router = Router();

router.get(
  '/',
  [
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
    query('start').optional().isInt({ min: 0 }).withMessage('start must be a non-negative integer')
  ],
  spacesController.getSpaces
);

router.get(
  '/:spaceId/pages',
  [
    param('spaceId').isString().notEmpty().withMessage('spaceId is required'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
    query('start').optional().isInt({ min: 0 }).withMessage('start must be a non-negative integer')
  ],
  spacesController.getSpacePages
);

export default router; 