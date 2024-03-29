import "./Pokecard.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

export default function Pokecard({name, url}) {
    const [info, setInfo] = useState(null);
    const [type, setType] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setInfo(data);
        setType(data.types[0].type.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  const boxStyle = {
    "background-color": typeColor(type)
  };

  return (
    <>
      {info ? (
        <div id="box" style={boxStyle}>
        <Link to="/info" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div id="alignment">
                <div class="content">
                    <h1>#{info.id} - {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                </div>
                <div class="content">
                    <img
                    src={info.sprites.front_default}
                    alt={`${name} sprite`}
                    />
                </div>
            </div>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

function typeColor(type) {
    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
      }
    
      return typeColors[type];

}