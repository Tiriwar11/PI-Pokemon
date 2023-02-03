import styles from './ColorsType.module.css'

const Colors = ({type}) => {
    
    
    if(type === undefined){
        return false;
    }
    if(type === "fire"){
        return(
            <h3 className={styles.fire}>{type}</h3>
        )
    }
    if(type === "grass"){
        return(
            <h3 className={styles.grass}>{type}</h3>
        )
    }
    if(type === "water"){
        return(
            <h3 className={styles.water}>{type}</h3>
        )
    }
    if(type === "electric"){
        return(
            <h3 className={styles.electric}>{type}</h3>
        )
    }
    if(type === "flying"){
        return(
            <h3 className={styles.flying}>{type}</h3>
        )
    }
    if(type === "normal"){
        return(
            <h3 className={styles.normal}>{type}</h3>
        )
    }
    if(type === "fighting"){
        return(
            <h3 className={styles.fighting}>{type}</h3>
        )
    }
    if(type === "poison"){
        return(
            <h3 className={styles.poison}>{type}</h3>
        )
    }
    if(type === "ground"){
        return(
            <h3 className={styles.ground}>{type}</h3>
        )
    }
    if(type === "rock"){
        return(
            <h3 className={styles.rock}>{type}</h3>
        )
    }
    if(type === "bug"){
        return(
            <h3 className={styles.bug}>{type}</h3>
        )
    }
    if(type === "ghost"){
        return(
            <h3 className={styles.ghost}>{type}</h3>
        )
    }
    if(type === "psychic"){
        return(
            <h3 className={styles.psychic}>{type}</h3>
        )
    }
    if(type === "steel"){
        return(
            <h3 className={styles.steel}>{type}</h3>
        )
    }
    if(type === "ice"){
        return(
            <h3 className={styles.ice}>{type}</h3>
        )
    }
    if(type === "dragon"){
        return(
            <h3 className={styles.dragon}>{type}</h3>
        )
    }

    if(type === "dark"){
        return(
            <h3 className={styles.dark}>{type}</h3>
        )
    }

    if(type === "fairy"){
        return(
            <h3 className={styles.fairy}>{type}</h3>
        )
    }

    if(type === "unknown"){
        return(
            <h3 className={styles.unknown}>{type}</h3>
        )
    }

    if(type === "shadow"){
        return(
            <h3 className={styles.shadow}>{type}</h3>
        )
    }
   
};

export default Colors;