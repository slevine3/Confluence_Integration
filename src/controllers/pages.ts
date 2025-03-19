import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getPages as getPagesService, getPageById as getPageByIdService } from '../services/pages';

export async function getPages(req: Request, res: Response): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { spaceKey } = req.query;
    const limit = parseInt(req.query.limit as string) || 25;
    const start = parseInt(req.query.start as string) || 0;

    if (!spaceKey) {
      res.status(400).json({ error: 'spaceKey is required' });
      return;
    }

    const pages = await getPagesService({
      spaceKey: spaceKey as string,
      limit,
      start
    });

    res.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({
      error: 'Failed to fetch pages',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getPageById(req: Request, res: Response): Promise<void> {
  try {
    const { pageId } = req.params;

    if (!pageId) {
      res.status(400).json({ error: 'pageId is required' });
      return;
    }

    const page = await getPageByIdService(pageId);
    res.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({
      error: 'Failed to fetch page',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 