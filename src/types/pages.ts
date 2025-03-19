export interface Page {
  id: string;
  title: string;
  spaceKey: string;
  status: string;
  body: {
    storage: {
      value: string;
      representation: string;
    };
  };
  version: {
    number: number;
    message: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PageList {
  results: Page[];
  limit: number;
  start: number;
  size: number;
  totalSize: number;
}

export interface PageQueryParams {
  spaceKey: string;
  limit?: number;
  start?: number;
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
    path: string[];
  }>;
} 