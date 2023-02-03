import React, { useEffect }from "react";
import styles from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons,orderByAttack,orderByAlphabet,filterByOrigen,filterByType,cleanCacheAll,getAllTypes } from "../redux/actions";
// import { useState } from "react";


const Filters = ({setFiltered}) => {


    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.allTypes);
    // let [,setFiltered] = useState("");

     useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, [dispatch])
    // function handleFilterType(e) {
    //     dispatch(filterPokemonByType(e.target.value))
    // }
    function handleOrderByAttack(e) {
        dispatch(orderByAttack(e.target.value));
        setFiltered(e.target.value)
    }

    let handleOrderByAlphabet = (e) => {
        dispatch(orderByAlphabet(e.target.value));
        //Necesita otro cambio para que se renderize el estado anterior
        setFiltered(e.target.value);
    }

    let handleOrigen = (e) => {
        dispatch(filterByOrigen(e.target.value));
        setFiltered(e.target.value);
    }

    let handleType = (e) => {
        dispatch(filterByType(e.target.value));
        setFiltered(e.target.value);
    }

    let handleReset = () => {
       
        dispatch(getAllPokemons());
      }

    return (
        <React.Fragment>
                <div className={styles.containerButtons}>

                    <select className={styles.buttons} onChange={e => handleOrderByAlphabet (e)}>
                        <option value="default" className={styles.selector}>ORDER ALPHABET</option>
                        <option value="az" className={styles.selector}>A-Z</option>
                        <option value="za" className={styles.selector}>Z-A</option>
                    </select>

                    <select className={styles.buttons} onChange={e => handleOrderByAttack (e)}>
                        <option value="default" className={styles.selector}>ORDER ATTACK</option>
                        <option value="maxAttack" className={styles.selector}>MAX ATTACK</option>
                        <option value="minAttack" className={styles.selector}>MIN ATTACK</option>
                    </select>

                    <select className={styles.buttons} onChange={e => handleType (e)} >
                        <option value="default" className={styles.selector}>ALL TYPES</option>
                        {
                        allTypes && allTypes.map( type => 
                            <option className={styles.selector} value={type.name} >{type.name.toUpperCase()}</option>)
                        }
                    </select>

                    <select className={styles.buttons} onChange={e => handleOrigen(e)}>
                        <option value="default" className={styles.selector}>ALL POKEMONS</option>
                        <option value="originals" className={styles.selector}>ORIGINALS</option>
                        <option value="created" className={styles.selector}>CREATED</option>
                    </select>

                    <button className={styles.reset}  onClick={() => handleReset()}>RESET</button>

                </div>
        </React.Fragment>
    )
};

export default Filters;