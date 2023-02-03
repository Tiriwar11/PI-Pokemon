import React from 'react';
import styles from './Card.module.css'
import { Link } from "react-router-dom";
import Colors from "../components/ColorsType.jsx";

const Card = ({idPokemon,name,image,types}) => {
    
    return (
        <React.Fragment>
            <Link to={`/detail/${idPokemon}`}>
                <div className={styles.card_container}>
                    <h3>{name} </h3>
                    <img className={styles.img} src={image} alt="Img not found"/>
                    <Colors type = {typeof types[0]==="object"? types[0].name:types[0]}/>
                    <Colors type = {typeof types[1]==="object"? types[1].name:types[1]}/>
                    {/* <h3>{types} </h3> */}
                    {/* {
                        types.map((t) => {
                            return (<Colors type = {t}/>)})
                    } */}
                 </div>
            </Link>
        </React.Fragment>
    )
};

export default Card;