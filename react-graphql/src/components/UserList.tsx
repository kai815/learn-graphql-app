import React, {useState} from 'react'
import {useQuery, gql, useMutation} from '@apollo/client';
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

const ADD_FAKE_USERS_MUTATION = gql`
    mutation addFakeUsers($count:Float!) {
        addFakeUsers(count:$count) {
            githubLogin
            name
            avatar
        }
    }
`
export const UserList = ()=> {
  const { loading, error, data, refetch } = useQuery(AllUSER);

  const [addFakeUsers,{loading:updating,error:mutateError,data:mutatedata}] = useMutation(ADD_FAKE_USERS_MUTATION)
  const onSubmit = async (e:React.SyntheticEvent)=>{
    e.preventDefault();
    const target = e.target as typeof e.target & {
      count: { value: string };
    };
    const countValue = target.count.value;
    const count = Number(countValue)
    console.log({count})
    await addFakeUsers({variables:{count}})
    await refetch()
  }
  if (loading) return <p>Loading...</p>;
  if (updating) return <p>Updating...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (mutateError) return <p>mutateError : {mutateError.message}</p>;
  console.log({mutatedata})
  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {data?.allUsers.map((user:UserModel,index:number) =>(
          <li key={`n-${index}`}>{user.githubLogin}</li>
        ))}
      </ul>
      <form method="post" onSubmit={onSubmit}>
        <input type="number" name="count"/>
        <button type="submit">
          add Fake Users
        </button>
      </form>
    </div>
  )
}