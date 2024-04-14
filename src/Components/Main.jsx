import React from "react";
import "./Main.css"

export default function Main(){
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
        </div>
    );
}