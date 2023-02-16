import React from 'react'
import { useQuery, gql } from '@apollo/client';
import {UserModel} from "../generated";



const AllUSER = gql`
    query {
        allUsers {
            name
            githubLogin
            avatar
            postedPhotos {
                name
                description
            }
        }
    }
`;
export const UserList = ()=> {
  const { loading, error, data } = useQuery(AllUSER);
  console.log({data})
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {data?.allUsers.map((user:UserModel,index:number) =>(
          <li key={`n-${index}`}>{user.githubLogin}</li>
        ))}
      </ul>
    </div>
  )
}