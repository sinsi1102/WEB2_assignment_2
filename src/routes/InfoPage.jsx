import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import "../components/InfoPage.css"

export default function InfoPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (data &&
        <div id="c">
            <div className="contents">
                <h1>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
            </div>
            <div id="content-box">
                <div className="contents">
                    <p>Type(s): {data.types.map(type => type.type.name).join(", ")}</p>
                    <p>Weight: {data.weight}</p>
                    <p>Height: {data.height}</p>
                    <p>Abilities: {data.abilities.map(ab => ab.ability.name).join(", ")}</p>
                    {data.stats.map(stat => {
                        return <p>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}</p>
                    })}
                </div>

                <div className="contents img-box">
                    <img src={data.sprites.front_default} alt={data.name} width="200px" height="auto"/>
                </div>
            </div>
        </div>
    );
}