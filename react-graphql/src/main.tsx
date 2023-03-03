import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {UserList} from "./components/UserList";
import {UserCacheList} from "./components/UserCacheList";
import { persistCache } from 'apollo3-cache-persist';
import {PostPhoto} from "./components/PostPhoto";
import {PhotoList} from "./components/PhotoList";

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: localStorage,
}).then(() => {
  // Continue setting up Apollo Client as usual.
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element:<UserList/>
  },
  {
    path:"/users-cache",
    element:<UserCacheList/>
  },
  {
    path:"/post-photo",
    element:<PostPhoto/>
  },
  {
    path:"/photo-list",
    element:<PhotoList/>
  }
]);


const uploadHttpLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token')
    }
  }
});


const client = new ApolloClient({
  // @ts-ignore<html>Type 'ApolloLink' is not assignable to type 'ApolloLink | RequestHandler'.は解決できてない
  link: ApolloLink.from([authLink,uploadHttpLink]),
  cache
});


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router}/>
    </ApolloProvider>
  </React.StrictMode>,
)
