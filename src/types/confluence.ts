export interface ConfluencePage {
  id: string;
  type: string;
  status: string;
  title: string;
  space: {
    id: string;
    key: string;
    name: string;
    type: string;
  };
  body: {
    storage: {
      value: string;
      representation: string;
    };
  };
  version: {
    number: number;
    message?: string;
    minorEdit: boolean;
    by: {
      displayName: string;
      username: string;
    };
    when: string;
  };
  _links: {
    self: string;
    webui: string;
  };
}


export interface PageSearchResult {
  results: ConfluencePage[];
  start: number;
  limit: number;
  size: number;
  _links: {
    base: string;
    context: string;
    next?: string;
    prev?: string;
  };
}

export interface ConfluenceSpace {
  id: string;
  key: string;
  name: string;
  type: string;
  status: string;
  description?: {
    plain: {
      value: string;
      representation: string;
    };
  };
  _links: {
    webui: string;
    self: string;
  };
}

export interface SpaceSearchResult {
  results: ConfluenceSpace[];
  start: number;
  limit: number;
  size: number;
  _links: {
    base: string;
    context: string;
    next?: string;
    prev?: string;
  };
}