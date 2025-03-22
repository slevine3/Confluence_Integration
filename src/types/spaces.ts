interface SpaceIcon {
  path?: string;
  width?: number;
  height?: number;
  isDefault?: boolean;
}

interface SpaceDescription {
  plain?: {
    value: string;
    representation: string;
  };
  view?: {
    value: string;
    representation: string;
  };
}

interface Space {
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

export interface SpaceList {
  results: Space[];
  _links: {
    base: string;
  };
}

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

export interface PageInSpaceList {
  results: PageInSpace[];
  _links: {
    base: string;
  };
}
  