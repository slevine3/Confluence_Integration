import { Request, Response } from 'express';
import { getSpaces as getSpacesService, getSpacePages as getSpacePagesService } from '../services';
import { handleErrorResponse } from '../utils';
import { AuthenticatedRequest } from '../types/auth';
import { SpaceList, PageInSpaceList } from '../types';

export async function getSpaces(req: Request, res: Response): Promise<void> {
  try {
    const { accessToken, cloudId } = (req as AuthenticatedRequest).session;

    const spaces: SpaceList = await getSpacesService(
      accessToken,
      cloudId,
    );
    res.json(spaces);
    return;
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}

export async function getSpacePages(req: Request, res: Response): Promise<void> {
  try {
    const { spaceId } = req.params;
    const { accessToken, cloudId } = (req as AuthenticatedRequest).session;
    const pages: PageInSpaceList = await getSpacePagesService(accessToken, cloudId, spaceId);
    
    res.json(pages);
    return;
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}