import { Link } from "react-router-dom";
import Pokecard from "../components/Pokecard";
import { useState, useEffect } from "react";
import "../components/Root.css"


export default function Root() {
    const[pokemon, setList] = useState(null);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset * 20}`)
        .then(response => response.json())
        .then(data => {
            setList(data.results);
        })
    }, [offset])

    const handleClick = (dir) => {
      setOffset(prev => prev + dir);
    }

    return (
      <div id="window">
        <h1>Pokedex</h1>
        {pokemon && (
          <div id="pokebox">
            {
              pokemon.map((pokemon, index) => (
                <Pokecard
                  key={index}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              ))
            }
          </div>
      )}

        <div id="navbar">
          { offset > 0 && 
            <div className="nav-stuff">
              <button onClick={() => handleClick(-1)}>Prev</button>
            </div>
          }
          <div className="nav-stuff">
            <p>{offset+1}</p>
          </div>
          <div className="nav-stuff">
            <button onClick={ () => handleClick(1)}>Next</button>
          </div>
        </div>
      </div>
    );
  }

