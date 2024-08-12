
// Описание типов каждого репозитория
export interface Repository {
  id: string;
  name: string;
  description: string;
  licenseInfo: {
    name: string;
  } | null;
  primaryLanguage: {
    name: string;
  } | null;
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
}

// Описание ответа от api
export interface RepositoriesResponse {
search: {
    repositoryCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges: {
      node: Repository;
    }[];
  };
}