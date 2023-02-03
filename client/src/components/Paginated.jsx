import React from "react";
import styles from "./Paginated.module.css";
import closedPoke from "../tools/closed.png";
import openPoke from "../tools/open.png";
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../redux/actions';

const Paginated = ({pokemonsPerPage, allPokemons}) => {
    let currentPage = useSelector(state => state.page);
    let dispatch = useDispatch();
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <React.Fragment>
            <div className={styles.paginated}>
                {
                    pageNumbers?.map(number => 
                        <div key={number}>
                            <button className={currentPage === number ? "btnActive" : "btnPagination"} id={styles.btn} onClick={() => dispatch(setCurrentPage(number))}>
                                <img className={styles.poke1} value={styles.btn} src={openPoke}/>
                                <h1 className={styles.text} >{number}</h1>
                                <img className={styles.poke2} src={closedPoke}/>
                            </button>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    )
};

export default Paginated;