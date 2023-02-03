import React from 'react';
import Card from './Card';
import {getAllPokemons} from '../redux/actions';
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from 'react';
import styles from './Cards.module.css'


const Cards = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons);

    useEffect(()=>{
        dispatch(getAllPokemons());
    },[]);

    return(

            <div className={styles.container_cards}>
                {pokemons.map((poke) => {
                   console.log(poke)
                   return(
                        <Card
                            key = {poke.id}
                            {...poke}
                        />
                    )
                })
                }

            </div>
    )
}

export default Cards;