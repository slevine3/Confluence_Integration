/**
 * Represents a space icon
 */
export interface SpaceIcon {
  path?: string;
  width?: number;
  height?: number;
  isDefault?: boolean;
}

/**
 * Represents a space description
 */
export interface SpaceDescription {
  plain?: {
    value: string;
    representation: string;
  };
  view?: {
    value: string;
    representation: string;
  };
}

/**
 * Represents a space
 */
export interface Space {
  id: string;
  key: string;
  name: string;
  type: 'global' | 'personal';
  status: string;
  createdAt: string;
  homepageId: string;
  authorId: string;
  currentActiveAlias: string;
  _links?: {
    webui?: string;
  };
  icon?: SpaceIcon;
  description?: SpaceDescription;
}

/**
 * Represents a list of spaces
 */
export interface SpaceList {
  results: Space[];
  _links: {
    base: string;
  };
}

/**
 * Parameters for querying spaces
 */
export interface SpaceQueryParams {
  ids?: string[];
  keys?: string[];
  type?: 'global' | 'personal';
  status?: string;
  limit?: number;
  start?: number;
}

/**
 * Represents a page within a space context
 */
export interface PageInSpace {
  id: string;
  title: string;
  spaceId: string;
  status: string;
  createdAt: string;
  parentId: string | null;
  parentType: string | null;
  position: number;
  ownerId: string;
  authorId: string;
  lastOwnerId: string | null;
  version: {
    number: number;
    message: string;
    minorEdit: boolean;
    authorId: string;
    createdAt: string;
  };
  _links?: {
    editui?: string;
    webui?: string;
    edituiv2?: string;
    tinyui?: string;
  };
  sourceTemplateEntityId?: string;
}

/**
 * Represents a list of pages within a space context
 */
export interface PageInSpaceList {
  results: PageInSpace[];
  _links: {
    base: string;
  };
}
  