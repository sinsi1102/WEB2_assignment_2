import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "./PockemonCard.css"


export default function PockemonCard({name, url}) {
    const [info, setInfo] = useState(null);
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                const pockemon = await response.json();
                setInfo(pockemon);
                setType(pockemon.type[0].type.name);
                setLoading(false);
            }catch(error){
                console.log(error)
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    const boxStyle = {
        "backgroundColor": typeColor(type)
      };

      return (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div id="box" style={boxStyle}>
              <Link
                to={`/info/${info.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div id="alignment">
                  <div className="content">
                    <h2>#{info.id} - {name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                  </div>
                  <div className="content">
                    <img
                      src={info.sprites.front_default}
                      alt={`${name} sprite`}
                    />
                  </div>
                </div>
              </Link>
            </div>
          )}
        </>
      );
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