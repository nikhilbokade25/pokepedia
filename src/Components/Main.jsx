import React, { useEffect, useState } from "react";
import "./Main.css"
import axios from "axios";

export default function Main(){

    const [pokemonData, setPokemonData] = useState([]);
    const url = "https://pokeapi.co/api/v2/pokemon?limit=500";

    useEffect (() => {
        const fetchData = async () => {
            try {
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
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };

        fetchData();
    }, [url]);
   

    return(
        <div className="main_container"> 
            <div className="navbar">
                <h2>Pokepedia</h2>
            </div>

            <div className="searchbar">
                <input 
                    type="text"
                    placeholder="Search a pokemon"
                    // value={searchTerm}
                    // onChange={handleSearch}
                />
            </div>

            <div className="pokemon_list">
                {pokemonData.map((pokemon, index)=>(
                    <div key={index} className="pokemon">
                        <img src={pokemon.sprites.front_default} alt=""/>
                        <h3>{pokemon.name}</h3>    
                    </div>
                ))}
            </div>
        </div>
    );
}