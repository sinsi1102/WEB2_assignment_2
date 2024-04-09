import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import "../components/InfoPage.css"
export default function InfoPage() {
    const { id } = useParams(); //gets the id from the router
    const [data, setData] = useState(null);

    //relies on id changing to execute again. if the dependency array was left empty, this would execute on every frame render
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    throw new Error('Response was not OK');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (data &&
        <div id="info-box">
            <div className="contents">
                <h1>{capitalizeFirstLetter(data.name)}</h1>
            </div>
            <div id="content-box">
                <div className="contents">
                    <p>Type(s): {data.types.map(type => type.type.name).join(", ")}</p>
                    <p>Weight: {data.weight}</p>
                    <p>Height: {data.height}</p>
                    <p>Abilities: {data.abilities.map(ab => ab.ability.name).join(", ")}</p>
                    {data.stats.map(stat => {
                        return <p key={stat.stat.name}>
                            {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
                        </p>
                    })}
                </div>

                <div className="contents img-box">
                    <img src={data.sprites.front_default} alt={data.name} width="200px" height="auto"/>
                </div>
            </div>
        </div>
    );
}