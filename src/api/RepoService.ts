import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RepositoriesResponse } from '../types/Repo';

const apiUrl = 'https://api.github.com/graphql';
const token = process.env.TOKEN;

export const repoApi = createApi({
  reducerPath: 'repoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `token ${token}`);
      headers.set('X-GitHub-Api-Version', '2022-11-28');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchRepositories: builder.query<RepositoriesResponse, { query: string; cursor?: string; perPage?: number }>({
      query: ({ query, cursor, perPage }) => ({
        url: '',
        method: 'POST',
        body: {
            query: `
            query($query: String!, $cursor: String, $perPage: Int) {
              search(query: $query, type: REPOSITORY, first: $perPage, after: $cursor) {
                repositoryCount
                pageInfo {
                  endCursor
                  hasNextPage
                }
                edges {
                  node {
                    ... on Repository {
                      id
                      name
                      description
                      licenseInfo {
                        name
                      }
                      primaryLanguage {
                        name
                      }
                    forkCount
                    stargazerCount
                    updatedAt
                    }
                  }
                }
              }
            }
          `,
          variables: { query, cursor, perPage },
        },
      }),
      transformResponse: (response: { data: RepositoriesResponse }) => {
        return response.data;
    },
    }),
    
  }),
});

export const { 
    useLazySearchRepositoriesQuery
 } = repoApi;
