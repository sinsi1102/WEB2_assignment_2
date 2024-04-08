import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import PockemonCard from "../components/PockemonCard";

export default function Root() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offset, setCurrentPage] = useState(0);
  const [totalPokemon, setTotalPokemon] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPokemon(data.results);
        setTotalPokemon(data.count);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokemon:', error);
        setLoading(false); // Update loading state in case of error
      });
  }, [offset]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePrevious = () => {
    if (offset > 0) {
      setCurrentPage(prevPage => prevPage - 20);
    }
  };

  const handleNext = () => {
    if (offset + 20 < totalPokemon) {
      setCurrentPage(prevPage => prevPage + 20);
    }
  };

  return (
    <>
      <h1>Pokedex</h1>
      <>
        <button onClick={handlePrevious}>PREVIOUS</button>
        <button onClick={handleNext}>NEXT</button>
      </>

      {pokemon && (
        <div>
          {pokemon.map((pokemon, index) => (
            <PockemonCard
              key={index}
              pokemon={pokemon.name}
              url={pokemon.url} />
          ))}
        </div>
      )}

      {/* <pre>{JSON.stringify(pokemon, null, 2)}</pre> */}

      {/* <br /> */}
      {/* <Link to={`/info`}>Info Page</Link><br /> */}
    </>
  );
}
