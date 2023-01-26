import './App.css'
import { useQuery, gql } from '@apollo/client';

const LOGIN = gql`
    query {
        viewer {
            login
            name
        }
    }
`;
function App() {
  const { loading, error, data } = useQuery(LOGIN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="App">
      <h1>Vite + React</h1>
      {data.viewer.login}
    </div>
  )
}

export default App
