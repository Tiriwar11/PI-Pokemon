import React, { useEffect } from "react";
import styles from "./DetailPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById,clean } from "../redux/actions/index.js";
import logoPoke from "../tools/logo.png";
import health from "../tools/health.ico";
import attack from "../tools/attack.ico";
import defense from "../tools/defense.ico";
import speed from "../tools/speed.ico";
import weight from "../tools/weight.ico";
import height from "../tools/height.ico";
import { Link } from "react-router-dom";
// import { useState } from "react";
// import Colors from "../components/ColorsType.jsx";

const DetailPage = (props) =>{
    let params = props.match.params.idPokemon;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonById(params))
    },[]);

    const pokemon = useSelector(state => state.pokemon);

    function handleClick(e) {
        dispatch(clean());
    }
    
    
    return(
        <React.Fragment>
            <div className={styles.background_Detail}>
                <nav className={styles.navbar_Menu}>
                    <img className={styles.pokelogo} src={logoPoke} alt="pokelogo-img" />
                    <div className={styles.namePage}>PokemPage</div>
                    <Link to="/pokemons">
                        <button className={styles.back} onClick={(e) => {handleClick(e)}}>Back</button>
                    </Link>
                </nav>
                <div className={styles.card}>
                    <div className={styles.boxTarget_Front}>
                        
                        <h3 className={styles.titleID} >Id:{pokemon.id_Pokemon} </h3>
                        {/*<p>{pokemon.id_Pokemon}</p> */}
                        <img className={styles.image} src={pokemon.image}/>
                        <h1 className={styles.namePoke1}>{pokemon.name}</h1>
                    </div>
                    <div className={styles.boxTarget_Back}>
                        <div className={styles.data}>
                            <div className={styles.data1}>
                                <h3> <img className={styles.icons} src={health}/> HEALTH: {pokemon.health}</h3>
                                <h3> <img className={styles.icons} src={attack}/> ATTACK: {pokemon.attack}</h3>
                                <h3> <img className={styles.icons} src={defense}/> DEFENSE: {pokemon.defense}</h3>
                            </div>
                            <div className={styles.data2}>
                                <h3> <img className={styles.icons} src={speed}/> SPEED: {pokemon.speed}</h3>
                                <h3> <img className={styles.icons} src={weight}/> WEIGHT: {pokemon.weight}</h3>
                                <h3> <img className={styles.icons} src={height}/> HEIGHT: {pokemon.height}</h3>
                            </div>
                        </div>
                        <div className={styles.types}>
                            <h1 className={styles.titleType}>Types : </h1>
                            {/* <Colors type = {pokemon.types[0]}/>
                            <Colors type = {pokemon.types[1]}/> */}
                            {/* <h3 className={styles.types}>{pokemon.types[1]}</h3> */}
                            
                        </div>
                        {console.log(pokemon.name)}
                        <h1 className={styles.namePoke2}>{pokemon.name}</h1>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DetailPage;