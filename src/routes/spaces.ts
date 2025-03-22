import { Router } from 'express';
import * as spacesController from '../controllers/spaces';
import { param } from 'express-validator';
import { validateRequest } from '../middleware';

const router = Router();

router.get(
  '/', spacesController.getSpaces
);

router.get(
  '/:spaceId/pages',
  [
    param('spaceId').isString().notEmpty().withMessage('spaceId is required'),
  ],
  validateRequest,
  spacesController.getSpacePages
);

export default router; 