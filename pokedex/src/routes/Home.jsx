import Pokecard from "../components/Pokecard";
import { useState, useEffect } from "react";
import "../components/home.css"

export default function Home() {
    const[pokemon, setList] = useState(null);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset * 20}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Response not OK');
          }
          return response.json();
        })
        .then(data => { setList(data.results); })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [offset])

    const handleClick = (dir) => {
      setOffset(prev => prev + dir);
    }

    return (
      <div id="window">
        <h1>Pokedex</h1>
        {pokemon && ( //gotta check that it's fetched, otherwise it complains before info is ever retrieved from api
          <div id="pokebox">
            {
              pokemon.map((pokemon) => (
                <Pokecard
                  key={pokemon.name}
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

