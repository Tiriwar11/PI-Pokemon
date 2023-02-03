import axios from 'axios';

export function getAllPokemons() {
    return async function(dispatch) {
       var json = await axios.get('http://localhost:3001/pokemons');

       return dispatch({
           type: 'GET_ALL_POKEMONS',
           payload: json.data
       });
    }
};

export const getAllTypes = () => {
    // return async function(dispatch) {
    //     return fetch("http://localhost:3001/types")
    //     .then(response => response.json())
    //     .then(json => dispatch({
    //         type: 'GET_ALL_TYPES',
    //         payload: json
    //     }))
    // }
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/types");
 
        return dispatch({
            type: 'GET_ALL_TYPES',
            payload: json.data
        });
     };
}


export function getPokemonById(idPokemon) {
    return async function(dispatch) {
    try{
       var json = await axios.get(`http://localhost:3001/pokemons/${idPokemon}`);

       return dispatch({
           type: 'GET_POKEMON_BY_ID',
           payload: json.data
       });
    }catch (error) {
        console.log(error)
    }
    }
};

// export const searchPokemonByName = (name) => {
//     return async function(dispatch) {
//         return fetch(`http://localhost:3001/pokemons?name=${name}`)
//         .then(response => response.json())
//         .then(json => dispatch({
//             type: 'SEARCH_POKEMON_BY_NAME',
//             payload: json
//         }))
//     }
// };
export const searchPokemonByName = (name) =>{

    return async function (dispatch) {
        var response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        return dispatch({
          type: 'SEARCH_POKEMON_BY_NAME',
          payload: response.data,
        });
      }
      
};



export const filterPokemonByType = (value) => {
    return {
            type: 'FILTER_POKEMON_BY_TYPE',
            payload: value
        }
};

export const orderByAttack = (value) => {
    return {
            type: 'ORDER_ATTACK',
            payload: value
        }
};

export const orderByAlphabet = (value) => {
    return {
        type: 'ORDER_ALPHABET', 
        payload: value
    }
}

export const filterByType = (value) => {
    return {
        type: 'FILTER_TYPE', 
        payload: value
    }
}

export const filterByOrigen = (value) => {
    return {
        type: 'FILTER_ORIGEN', 
        payload: value
    }
}


export const createPokemon = (valuesInput) => {
    const inputs = {
            name: valuesInput.name,
            types: [valuesInput.firstType, valuesInput.secondType],
            image: valuesInput.image,
            health: valuesInput.health,
            attack: valuesInput.attack,
            defense: valuesInput.defense,
            speed: valuesInput.speed,
            height: valuesInput.height, 
            weight: valuesInput.weight
    }
    return async function(dispatch) {
        return fetch("http://localhost:3001/pokemons/create", {
            method: 'POST', 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(json => dispatch({
            type: 'CREATE_POKEMON',
            payload: json
        }))
    }
};

export const setCurrentPage = (payload) => {
    return {
        type: 'SET_CURRENT_PAGE', 
        payload
    }
}

export function clean() {
    return (dispatch)=>{
      return dispatch({
        type: 'CLEAN', 
        payload: {}
    })
    }
}

export const cleanCacheAll = () => {
    return {
        type: 'CLEAN_CACHE_ALL'
    }
}
