import React from 'react'
import {useQuery, gql} from '@apollo/client';
import {PhotoModel} from "../generated";
import {Link} from "react-router-dom";



const ALL_PHOTO = gql`
    query {
        allPhotos {
            name
            description
            url
            category
            postedBy {
                githubLogin
            }
        }
    }
`;

export const PhotoList = ()=> {
  const { loading, error, data } = useQuery(ALL_PHOTO,{
    fetchPolicy:'network-only'
  });
  console.log({data})
  console.log({error})
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h1>投稿された写真一覧</h1>
      <Link to={"/post-photo"}>
        写真の投稿
      </Link>
      <ul>
        {data?.allPhotos.map((photo:PhotoModel,index:number) =>(
          <li key={`n-${index}`}>
            <p>name:{photo.name}</p>
            <p>description:{photo.description}</p>
            <img src={photo.url}/>
          </li>
        ))}
      </ul>
    </div>
  )
}