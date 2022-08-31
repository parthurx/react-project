import React, {useEffect, useState} from "react";
import pokedex from "./components/img/pokedex.png";
import axios from 'axios';

import "./App.css";


function App() {
  const [input, setInput] = useState("1");
  const [pokemonName, setName] = useState("");
  const [pokemonId, setId] = useState(1)
  const [pokemonImg, setImg] = useState(1)
  const [loading, setLoad] = useState(false)
//   const onChangeHandler = (event) => {
//     setInput(event.target.value);
// };

 const handleKeyPress  = (event) => {
    if(event.key === "Enter"){
      setInput(event.target.value);
    }
 }

  

  useEffect(() => {
    setLoad(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`)
    
    .then((response) => {
      setName(response.data.name);
      setId(response.data.id);
      setImg(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`);
      
      
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => setLoad(false));
  }, [input]);
  
  if(loading) return  <h1>Carregando...</h1>

  return (
    <div className="images">
      <img className="pokemon_img" src={pokemonImg}/>
      <img className="pokedex" src={pokedex} />
      <h1 className="pokemon_data">
        <span className="pokemon_number">{pokemonId}</span> 
        <span className="pokemon_name">- {pokemonName}</span>
      </h1>
      <div className="input-search">
      <input
         className="input__search"
         type="search"
         name="input_search"
         placeholder="Name or number"
        //  onChange={onChangeHandler}
        onKeyPress={handleKeyPress}
      
         required
       />
      </div>
      <div className="buttons">
        <button>Prev &lt;</button>
        <button>Next &gt;</button>
      </div>
    </div>
   
  );
}

export default App;
