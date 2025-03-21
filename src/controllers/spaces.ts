import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getSpaces as getSpacesService, getSpacePages as getSpacePagesService } from '../services';
import { handleErrorResponse } from '../utils';

export async function getSpaces(req: Request, res: Response): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!req.session.accessToken || !req.session.cloudId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 25;
    const start = parseInt(req.query.start as string) || 0;

    const spaces = await getSpacesService(
      req.session.accessToken,
      req.session.cloudId,
      limit,
      start
    );
    res.json(spaces);
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}

export async function getSpacePages(req: Request, res: Response): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!req.session.accessToken || !req.session.cloudId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { spaceId } = req.params;
    if (!spaceId) {
      res.status(400).json({ error: 'spaceId is required' });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 25;
    const start = parseInt(req.query.start as string) || 0;

    const pages = await getSpacePagesService(
      req.session.accessToken,
      req.session.cloudId,
      spaceId,
      limit,
      start
    );
    res.json(pages);
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}