import { Request, Response } from 'express';
import { getPages as getPagesService, getPageById as getPageByIdService } from '../services';
import { handleErrorResponse } from '../utils';
import { AuthenticatedRequest } from '../types/auth';
import { Page, PageList } from '../types';

export async function getPages(req: Request, res: Response): Promise<void> {
  try {
    const { accessToken, cloudId } = (req as AuthenticatedRequest).session;
    const pages: PageList = await getPagesService(accessToken, cloudId);
    res.status(200).json(pages);
    return;
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}

export async function getPageById(req: Request, res: Response): Promise<void> {
  try {
    const { pageId } = req.params;
    const { accessToken, cloudId } = (req as AuthenticatedRequest).session;
    const page: Page = await getPageByIdService(accessToken, cloudId, pageId);
    res.status(200).json(page);
    return;
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}