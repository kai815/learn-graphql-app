import './App.css'
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";

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
      <p>
        <Link to={"repositories"}>
          リポジトリ一覧
        </Link>
      </p>
    </div>
  )
}

export default App
