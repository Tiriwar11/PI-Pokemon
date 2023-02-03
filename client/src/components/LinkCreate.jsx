import React from "react";
import styles from "./LinkCreate.module.css";
import { Link } from "react-router-dom";


const LinkCreate = () => {

    return (
        <React.Fragment>
            <Link to="/pokemons/create">
                    <button className={styles.button}>Create Pokemon</button>
            </Link> 
        </React.Fragment>
    )
};

export default LinkCreate;