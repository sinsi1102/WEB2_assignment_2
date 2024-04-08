import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function InfoPage() {
    const { id } = useParams();
    const [pockemon, setPockemon] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPockemon(data);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);


    return (pockemon &&
        <div id="info-box">
            <div className="contents">
                <h1>{pockemon.name.charAt(0).toUpperCase() + pockemon.name.slice(1)}</h1>
            </div>
            <div id="content-box">
                <div className="contents">
                    <p>Type(s): {pockemon.types.map(type => type.type.name).join(", ")}</p>
                    <p>Weight: {pockemon.weight}</p>
                    <p>Height: {pockemon.height}</p>
                    <p>Abilities: {pockemon.abilities.map(ab => ab.ability.name).join(", ")}</p>
                    {pockemon.stats.map(stat => {
                        return <p>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}</p>
                    })}
                    
                </div>

                <div className="contents img-box">
                    <img src={pockemon.sprites.front_default} alt={pockemon.name} width="200px" height="auto"/>
                </div>
            </div>
        </div>
    );
}