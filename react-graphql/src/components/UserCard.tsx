import {gql} from '@apollo/client';
import {UserModel} from "../generated";

export const USER_FIELDS = gql`
    fragment UserFields on UserModel {
        githubLogin
        name
    }
`

export const UserCard = ({user}:{user:UserModel}) =>{
  return <div>
    <p>Id:{user.githubLogin}</p>
    <p>Name:{user.name}</p>
  </div>
}
