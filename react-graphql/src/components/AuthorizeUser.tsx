import React from 'react'
import { useQuery, gql,useMutation } from '@apollo/client';

const ME = gql`
  query getMe{
      me {
          githubLogin
          name
          avatar
      }
  }
`

const AUTH_GITHUB_USER = gql`
    mutation gitHubAuth($code:String!) {
        gitHubAuth(code:$code) {
            token
            user {
                githubLogin
                name
                avatar
            }
        }
    }`


export const AuthorizeUser = ()=>{
  const {loading,data,error} = useQuery(ME)
  const [githubAuthMutation,{loading:authing,data:authData,error:authError}] = useMutation(AUTH_GITHUB_USER)
  const requestCode = () => {
    const clientID = import.meta.env.VITE_CLIENT_ID
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`
  }
  if (window.location.search.match(/code=/)) {
    const code = window.location.search.replace("?code=", "")
    console.log(code)
    githubAuthMutation({ variables: { code } }).then(response=>{
      localStorage.setItem('token', response.data.githubAuth.token)
    })
  }
  if (loading) return <p>CurrentUserLoading...</p>;
  if(error) return <p>login error...</p>
  if(data?.me?.githubLogin){
    return <>
      <p>ログインしてるユーザー</p>
      <p>{data.me.githubLogin}</p>
    </>
  }
  return <button onClick={requestCode}>Sign in GitHub</button>
}