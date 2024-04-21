import React, { useEffect, useState } from "react";
import "./Main.css"
import axios from "axios";

export default function Main(){

    const [pokemonData, setPokemonData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState((true));
    const url = "https://pokeapi.co/api/v2/pokemon?limit=500";

    useEffect (() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                const pokemonList = response.data.results;
                const pokemonDetails = await Promise.all(
                    pokemonList.map(async (pokemon) => {
                        const result = await axios.get(pokemon.url);
                        return result.data;
                    })
                );
                setPokemonData(pokemonDetails);
                console.log(pokemonDetails); 
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    const handlePokemonClick = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleClosePopup = () => {
        setSelectedPokemon(null);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPokemon = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
   

    return(
        <div className="main_container"> 
            <div className="navbar">
                <h2>Pokepedia</h2>
            </div>

            <div className="searchbar">
                <input 
                    type="text"
                    placeholder="Search a pokemon"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="pokemon_list">
            {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredPokemon.map((pokemon, index) => (
                        <div key={index} className="pokemon" onClick={() => handlePokemonClick(pokemon)}>
                            <img src={pokemon.sprites.front_default} alt="" />
                            <h3>{pokemon.name}</h3>
                        </div>
                    ))
                )}
            </div>

            {selectedPokemon && (
            <div className="popup">
                <div className="popup_content">
                    <span className="close" onClick={handleClosePopup}>×</span>

            <div className="poke_details">
                <h2>{selectedPokemon.name}</h2>
                <p><b>HP:</b> {selectedPokemon.stats[0].base_stat}</p> 
                <p><b>Attack: </b>{selectedPokemon.stats[1].base_stat}</p> 
                <p><b>Special Attack: </b>{selectedPokemon.stats[3].base_stat}</p>
                <p><b>Height: </b>{selectedPokemon.height}</p>
                <p><b>Weight: </b>{selectedPokemon.weight}</p>
            </div>

            <div className="poke_image">
                <img src={selectedPokemon.sprites.front_default} alt="" />
            </div>
        </div>
    </div>
)}

        </div>
    );
}