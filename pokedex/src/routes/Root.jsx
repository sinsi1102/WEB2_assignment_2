import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';

export default function Root() {
  const [pockemon, serPockemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        serPockemon(data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [offset]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePrevious = () => {
    if (offset !== 0) {
      setCurrentPage(prevPage => prevPage - 20);
    }
  };

  const handleNext = () => {
    if (offset <= 1280) {
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

      {pockemon &&
        (<div className="card-container">{
          pockemon.map((pockemon, index) => (
            <Card key={index} pokemon={pockemon.name} url={pockemon.url} />
          ))
        }
        </div>

        )}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <br />
      <Link to={`/info`}>Info Page</Link><br />
    </>
  );
}

const Card = ({ key, name , url}) => {
  return (
    <div className="card">
      <h3>#{key}</h3>
      <p>name: {name}</p>
      <Link to={url}>pockemon</Link>
      {/* <img src={pokemon.image} alt={pokemon.name} /> */}
      {/* Add other item data as needed */}
    </div>
  );
}