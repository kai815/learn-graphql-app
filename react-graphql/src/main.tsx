import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {UserList} from "./components/UserList";
import {UserCacheList} from "./components/UserCacheList";
import { persistCache } from 'apollo3-cache-persist';

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
  }
]);


const httpLink = createHttpLink({
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
  link: authLink.concat(httpLink),
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
