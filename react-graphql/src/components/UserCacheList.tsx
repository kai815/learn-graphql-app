import React from 'react'
import {useQuery, gql} from '@apollo/client';
import {UserModel} from "../generated";
import {Link} from "react-router-dom";
import {UserCard,USER_FIELDS} from "./UserCard";


const AllUSER = gql`
    ${USER_FIELDS}
    query {
        allUsers {
            ...UserFields
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
          <li key={`n-${index}`}>
            <UserCard user={user}/>
          </li>
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