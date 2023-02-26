import './App.css'
import { Link } from "react-router-dom";
import {AuthorizeUser} from "./components/AuthorizeUser";

function App() {
  return (
    <div className="App">
      <h1>Vite + React</h1>
      <p>
        <Link to={"users"}>
          ユーザー一覧
        </Link>
      </p>
      <p>
        <Link to={"post-photo"}>
          写真の投稿
        </Link>
      </p>
      <AuthorizeUser/>
    </div>
  )
}

export default App
