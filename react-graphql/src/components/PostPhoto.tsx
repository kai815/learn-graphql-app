import React, {useState} from 'react'
import {useQuery, gql, useMutation} from '@apollo/client';
import {CreatePhotoDto} from "../generated";

const POST_PHOTO = gql`
    mutation posPhoto($inputPhoto:CreatePhotoDto!) {
        postPhoto(inputPhoto:$inputPhoto) {
            name
            description
            url
        }
    }
`
export const PostPhoto = ()=> {
  const [file, setFile] = useState<File | null>(null)
  const [postPhoto,{loading:updating,error:mutateError,data:mutatedata}] = useMutation(POST_PHOTO)
  const onSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      description:{ value: string };
      category:{value: string};
    };
    const inputPhoto = {
      name:target.name.value,
      description:target.description.value,
      category:target.category.value,
      image:file
    }
    await postPhoto({variables:{inputPhoto}})
  }

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }


  if (updating) return <p>Updating...</p>;
  if (mutateError) return <p>mutateError : {mutateError.message}</p>;
  console.log({mutatedata})
  return (
    <div>
      <h1>写真の投稿</h1>
      <form
        method="post"
        onSubmit={onSubmit}
        style={{
          display:'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap:'20px'
      }}>
        <input type="text" name="name"/>
        <textarea name="description"/>
        <select name="category">
          <option value="PORTRAIT">PORTRAIT</option>
          <option value="LANDSCAPE">LANDSCAPE</option>
          <option value="ACTION">ACTION</option>
          <option value="GRAPHIC">GRAPHIC</option>
        </select>
        <input
          type="file"
          name="image"
          accept="image/jpeg"
          onChange={onChangeFile}
        />
        <button type="submit">
          post
        </button>
      </form>
    </div>
  )
}