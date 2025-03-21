import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getPages as getPagesService, getPageById as getPageByIdService, getSpacePages as getSpacePagesService } from '../services';
import { handleErrorResponse } from '../utils';

export async function getPages(req: Request, res: Response): Promise<void> {
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

    const { spaceKey } = req.query;
    const limit = parseInt(req.query.limit as string) || 25;
    const start = parseInt(req.query.start as string) || 0;

    const pages = await getPagesService(req.session.accessToken, req.session.cloudId, spaceKey as string | undefined, limit, start);
    res.json(pages);
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}

export async function getPageById(req: Request, res: Response): Promise<void> {
  try {
    const { pageId } = req.params;

    if (!pageId) {
      res.status(400).json({ error: 'pageId is required' });
      return;
    }

    if (!req.session.accessToken || !req.session.cloudId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const page = await getPageByIdService(req.session.accessToken, req.session.cloudId, pageId);
    res.json(page);
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}