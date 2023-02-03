import React, { useState, useEffect } from "react";
import styles from "./CreatePage.module.css";
import { Link } from "react-router-dom";
import logoPoke from "../tools/logo.png";
import validations from "../components/Validations.jsx"
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTypes, createPokemon } from "../redux/actions";

const CreatePage = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const allTypes = useSelector((state) => state.allTypes);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch])
    
    
    let [input, setInput] = useState({
        name: "",
        firstType: "",
        secondType:"",
        image: logoPoke,
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0, 
        weight: 0
    })


    let handleInputChange = (e) => {
        e.preventDefault();
        if(e.target.type === "number"){
            setInput({...input, [e.target.name]: parseInt(e.target.value, 10)});
        }
        if(e.target.type === "text"){
            setInput( prev => ({...prev, [e.target.name]: e.target.value.toLowerCase()}));
        }
        setInput(({...input, [e.target.name]: e.target.value}));
        setErrors(validations({...input, [e.target.name]: e.target.value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(createPokemon(input));
        setInput({
            name: "",
            firstType: "",
            secondType: "",
            image: "",
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0, 
            weight: 0
        });
        alert("Pokemon has been created successfully!");
        history.push("/pokemons");
    }
    return(
    <React.Fragment>
    <div className={styles.background_Create}>
        <nav className={styles.navbar_Menu}>
            <img className={styles.pokelogo} src={logoPoke} alt="pokelogo-img" />
            <div className={styles.namePage}>PokemPage</div>
            <Link to="/pokemons">
                <button className={styles.back}>Back</button>
             </Link>
        </nav>
        <div className={styles.content}>   
            
            <h1 className={styles.title}>Create your pokemon!</h1>
            
            <div className={styles.boxForm}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.nameInput}>
                        <input className={styles.inputString}
                        type="text" value={input.name} 
                        name="name" placeholder="Write a name..."  
                        onChange={(e) => handleInputChange(e)}/>
                        {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                    </div>
                    <div className={styles.imageInput}>
                        <input className={styles.inputString}
                        type="text" 
                        name="image" placeholder="Paste a image..."  
                        onChange={(e) => handleInputChange(e)}/>
                        {/* {errors.image && (<p>{errors.image}</p>)} */}
                    </div>
                    <div className={styles.containerInputs1}>
                        <div className={styles.box1}>
                            <p className={styles.subtitle}>Health</p>
                            <input className={styles.inputNum} type="number" value={input.health} name="health" min="1" max="500" onChange={(e) => handleInputChange(e)} />
                            {errors.health && (<p className={styles.error}>{errors.health}</p>)}
                        </div>
                        <div className={styles.box2}>
                            <p className={styles.subtitle}>Attack</p>
                            <input className={styles.inputNum} type="number" value={input.attack} name="attack" min="1" max="500" onChange={(e) => handleInputChange(e)} />
                            {errors.attack && (<p className={styles.error}>{errors.attack}</p>)}
                        </div>
                        <div className={styles.box3}>
                            <p className={styles.subtitle}>Defense</p>
                            <input className={styles.inputNum} type="number" value={input.defense} name="defense" min="1" max="500" onChange={(e) => handleInputChange(e)} />
                            {errors.defense && (<p className={styles.error}>{errors.defense}</p>)}
                        </div>
                    </div>
                    <div className={styles.containerInputs2}>
                        <div className={styles.box1}>
                            <p className={styles.subtitle}>Speed</p>
                            <input className={styles.inputNum} type="number" value={input.speed} name="speed" min="1" max="500" onChange={(e) => handleInputChange(e)} />
                            {errors.speed && (<p className={styles.error}>{errors.speed}</p>)}
                        </div>
                        <div className={styles.box2}>
                            <p className={styles.subtitle}>Height</p>
                            <input className={styles.inputNum} type="number" value={input.height} name="height" min="1" max="300" onChange={(e) => handleInputChange(e)} />
                            {errors.height && (<p className={styles.error}>{errors.height}</p>)}
                        </div>
                        <div className={styles.box3}>
                            <p className={styles.subtitle}>Weight</p>
                            <input className={styles.inputNum} type="number" value={input.weight} name="weight" min="1" max="999" onChange={(e) => handleInputChange(e)} />
                            {errors.weight && (<p className={styles.error}>{errors.weight}</p>)}
                        </div>
                    </div>
                <div className={styles.containerTypes}>
                    <p className={styles.subtitle}>Types:</p>
                    <div className={styles.subTypes}>
                        <div className={styles.type1}>
                            <select className={styles.inputType} name='firstType' onChange={(e) => handleInputChange(e)}>
                            <option value="">First Type</option>
                            { allTypes?.map( type =>
                                <option value={type.name} key={type.name}>{type.name.toUpperCase()}</option>
                            )}
                            </select>
                        </div>
                        <div className={styles.type2}>
                            <select className={styles.inputType} name='secondType' onChange={(e) => handleInputChange(e)}>
                            <option value="">Second Type</option>
                            {allTypes?.map( type =>
                                <option value={type.name} key={type.name}>{type.name.toUpperCase()}</option>
                            )}
                            </select>
                        </div>
                    </div>
                    {errors.types && (<p className={styles.error}>{errors.types}</p>)}
                </div>
                {
                    (errors.name || errors.types || errors.attack || errors.defense || errors.speed || errors.height || errors.weight ||errors.health) ? <button className={styles.buttonCreate} disabled>NO!</button> : <button className={styles.buttonCreate} type="submit" >CREATE!</button> 
                }
                {/* <button className={styles.buttonCreate} type="submit" >CREATE!</button>  */}
                </form>
            </div> 
        </div>   
    </div>
    </React.Fragment>
    )
}

export default CreatePage;