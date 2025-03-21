/**
 * Represents a page's version information
 */
export interface PageVersion {
  number: number;
  message: string;
  createdAt: string;
  minorEdit?: boolean;
  authorId?: string;
}

/**
 * Represents a page's body content
 */
export interface PageBody {
  storage?: {
    value: string;
    representation: string;
  };
}

/**
 * Represents a page
 */
export interface Page {
  id: string;
  title: string;
  spaceId: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string | null;
  parentType?: string | null;
  position?: number;
  ownerId?: string;
  authorId: string;
  lastOwnerId?: string | null;
  version: PageVersion;
  body?: PageBody;
  _links?: {
    webui?: string;
    tinyui?: string;
  };
  sourceTemplateEntityId?: string;
}

/**
 * Represents a list of pages with pagination information
 */
export interface PageList {
  results: Page[];
  limit?: number;
  start?: number;
  size?: number;
  totalSize?: number;
  _links?: {
    base: string;
  };
}