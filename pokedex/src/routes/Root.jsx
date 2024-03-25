import { Link } from "react-router-dom"
export default function Root() {
    return (
      <>
        <h1>Pokedex</h1>
        <Link to={`/info`}>Info Page</Link><br/>
      </>
    );
  }