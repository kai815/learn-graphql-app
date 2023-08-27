import {UserModel} from "../generated";
type User = {
  githubLogin: string
}

export const UserCard = ({user}:{user:User}) =>{
  return <div>{user.githubLogin}</div>
}