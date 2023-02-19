import React from 'react'
import {useQuery, gql} from '@apollo/client';
import {UserModel} from "../generated";
import {Link} from "react-router-dom";



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

export const UserCacheList = ()=> {
  const { loading, error, data, client } = useQuery(AllUSER,{
    fetchPolicy:'cache-only'
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h1>キャッシュユーザー一覧</h1>
      <Link to={"/users"}>
        通常のユーザー一覧
      </Link>
      <ul>
        {data?.allUsers.map((user:UserModel,index:number) =>(
          <li key={`n-${index}`}>{user.githubLogin}</li>
        ))}
      </ul>
      <button onClick={async ()=>{
        await client.resetStore()
      }}>
        cache reset
      </button>
    </div>
  )
}