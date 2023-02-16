import React from 'react'
import { useQuery, gql } from '@apollo/client';

//これはGitHubのgqplの時のやつ
const SEARCH_REPOSITORY = gql`
    query {
        search(type: REPOSITORY, query: "user:kai815", last: 100) {
            repositoryCount
            nodes {
                ... on Repository {
                    id
                    url
                    name
                    description
                    createdAt
                }
            }
        }
    }
`;
export const Repository = ()=> {
  const { loading, error, data } = useQuery(SEARCH_REPOSITORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      <h1>kai815のRepositoryたち</h1>
      <ul>
      {data.search.nodes.map((repo:any,index:number)=>(<li key={`n-${index}`}>{repo.name}</li>))}
      </ul>
    </div>
  )
}