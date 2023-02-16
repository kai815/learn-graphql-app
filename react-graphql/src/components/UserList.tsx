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
    mutation addFakeUsers {
        addFakeUsers(count:2) {
            githubLogin
            name
            avatar
        }
    }
`
export const UserList = ()=> {
  const { loading, error, data,refetch } = useQuery(AllUSER);

  const [addFakeUsers,{loading:updating,error:mutateError,data:mutatedata}] = useMutation(ADD_FAKE_USERS_MUTATION)
  const [count,setCount] = useState(0)

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
        <input type="number" name="count" value={count} onChange={(e)=>{
          const count = e.target.value
          setCount(Number(count))
        }}/>
        <button type="submit" onClick={()=>{
          console.log({variables:{count:count}})
          addFakeUsers().then(result=>{
            console.log({result})
            refetch()
          })
        }}>
          add Fake Users
        </button>
    </div>
  )
}