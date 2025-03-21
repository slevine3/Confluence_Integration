import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getPages as getPagesService, getPageById as getPageByIdService } from '../services';
import { handleErrorResponse } from '../utils';
import { AuthenticatedRequest } from '../types/auth';
import { Page, PageList } from '../types';

export async function getPages(req: Request, res: Response): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { accessToken, cloudId } = (req as unknown as AuthenticatedRequest).session;
    const pages: PageList = await getPagesService(accessToken, cloudId);
    res.json(pages);
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}

export async function getPageById(req: Request, res: Response): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { pageId } = req.params;

    const { accessToken, cloudId } = (req as unknown as AuthenticatedRequest).session;
    const page: Page = await getPageByIdService(accessToken, cloudId, pageId);
    res.json(page);
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}