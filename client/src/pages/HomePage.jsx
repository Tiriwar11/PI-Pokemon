import React from "react";
import styles from "./HomePage.module.css";
import stylesCards from '../components/Cards.module.css'
import logoPoke from "../tools/logo.png";
import SearchBar from "../components/SearchBar.jsx";
import LinkCreate from "../components/LinkCreate.jsx";
import Filters from "../components/Filters.jsx";
import Paginated from "../components/Paginated.jsx";
import Card from "../components/Card.jsx";
import {useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { getAllPokemons } from "../redux/actions";
import NotFound from "../components/NotFound.jsx";

const HomePage = () => {

    const dispatch = useDispatch(); 
    let page = useSelector(state => state.page);
    // const allPokemons = useSelector(state => state.pokemons);
    const filteredPoke = useSelector(state => state.filteredPokemons);

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch])

    const [, setFiltered] = useState("");
    const pokemonsPerPage = 12;
    const lastPokemon = page * pokemonsPerPage; //2*12 = 24
    const firstPokemon = lastPokemon - pokemonsPerPage; //24 - 12 = 12
    const currentPokemons = filteredPoke.slice(firstPokemon, lastPokemon);

    // const paginated = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <React.Fragment>
             <div className={styles.background_Home}>
                <nav className={styles.navbar_Menu}>
                    <img className={styles.pokelogo} src={logoPoke} alt="pokelogo-img" />
                    <div className={styles.namePage}>PokemPage</div>
                    <LinkCreate/>
                    <SearchBar/>
                </nav>
                <nav>
                    <Filters setFiltered={setFiltered} />
                    <Paginated 
                        pokemonsPerPage = {pokemonsPerPage} 
                        allPokemons = {filteredPoke.length} 
                    />

                    <div className={stylesCards.container_cards}>
                    {
                        (currentPokemons.length  > 0 ) ? 
                        currentPokemons.map(
                        pokemon => <Card 
                        key={pokemon.id_Pokemon} 
                        idPokemon={pokemon.id_Pokemon} 
                        name={pokemon.name}
                        image={pokemon.image} 
                        types={pokemon.types} />) :
                        <NotFound />
                    }
                    </div>
                </nav>

             </div>        
        </React.Fragment>
    )
};

export default HomePage;
