import React from 'react'
import NotFoundGif from "../tools/404.gif";
import styles from "./NotFound.module.css"


const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <img className={styles.notFoundImage} src={NotFoundGif} alt='NotFound' />
            <h2 className={styles.title}>Pokemon not found</h2>
        </div> 
    )
}

export default NotFound;