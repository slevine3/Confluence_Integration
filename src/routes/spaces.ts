import { Router } from 'express';
import * as spacesController from '../controllers/spaces';
import { param } from 'express-validator';
const router = Router();

router.get(
  '/', spacesController.getSpaces
);

router.get(
  '/:spaceId/pages',
  [
    param('spaceId').isString().notEmpty().withMessage('spaceId is required'),
  ],
  spacesController.getSpacePages
);

export default router; 