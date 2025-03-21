import { Request, Response } from 'express';
import { getSpaces as getSpacesService, getSpacePages as getSpacePagesService } from '../services';
import { handleErrorResponse } from '../utils';
import { AuthenticatedRequest } from '../types/auth';
import { Space, SpaceList, SpaceQueryParams, PageInSpaceList } from '../types';
import { validationResult } from 'express-validator';

export async function getSpaces(req: Request, res: Response): Promise<void> {
  try {
    const { accessToken, cloudId } = (req as AuthenticatedRequest).session;

    const query: SpaceQueryParams = {
      limit: parseInt(req.query.limit as string) || 25,
      start: parseInt(req.query.start as string) || 0
    };

    const spaces: SpaceList = await getSpacesService(
      accessToken,
      cloudId,
      query.limit,
      query.start
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

    const { spaceId } = req.params;

    const { accessToken, cloudId } = (req as AuthenticatedRequest).session;
    const pages: PageInSpaceList = await getSpacePagesService(
      accessToken,
      cloudId,
      spaceId,
    );
    res.json(pages);
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
}