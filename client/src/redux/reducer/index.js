
const initialState = {
    pokemons: [],
    pokemon: {},
    allTypes: [],
    filteredPokemons: [],
    page: 1
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                filteredPokemons: action.payload
            }
        case 'GET_ALL_TYPES':
            return {
                ...state,
                allTypes: action.payload
            }   
        case 'GET_POKEMON_BY_ID':
            return {
                ...state,
                pokemon: action.payload,
            }
        case 'SEARCH_POKEMON_BY_NAME':
            return {
                ...state,
                filteredPokemons: action.payload,
                page:1
            }
        case 'CREATE_POKEMON':
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        case 'FILTER_POKEMON_BY_TYPE':
            const allPokemons = state.filteredPokemons;
            const filterType = allPokemons.filter(p => p.types.includes(action.payload))
            return {
                ...state,
                pokemons: filterType
            }  
        case 'ORDER_ATTACK':
            let pokesAttack;
            if (action.payload === "maxAttack") {
                    pokesAttack = state.filteredPokemons.sort((a, b) => b.attack - a.attack);
            } else if(action.payload === "minAttack") {
                    pokesAttack = state.filteredPokemons.sort((a, b) => a.attack - b.attack);
            }else{
                return {
                    ...state,
                    filteredPokemons: state.pokemons,
                }
            }
            return {
                ...state,
                filteredPokemons: pokesAttack,
                page: 1
            }
        case 'ORDER_ALPHABET':
            let pokesAlpha;
            if (action.payload === "az") {
            pokesAlpha = state.filteredPokemons.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            });
            } else if (action.payload === "za"){
                pokesAlpha = state.filteredPokemons.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
                });
            } else{
                return {
                    ...state,
                    filteredPokemons: state.pokemons,
                }
            }
            return {
                ...state,
                filteredPokemons: pokesAlpha,
                page: 1
            }
        case 'FILTER_ORIGEN':
            // const allSavedPokemons = state.filteredPokemons;
            // const filterCreateOrExisting = action.payload === "created" ? allSavedPokemons.filter(p => p.id_Pokemon.length > 20) : allSavedPokemons.filter(p => p.id_Pokemon <= 40); 
            // return {
            //     ...state,
            //     pokemons: filterCreateOrExisting
            // }
            console.log(state.pokemons)
            if (action.payload === "default") {
                return {
                    ...state,
                    filteredPokemons: state.pokemons,
                    page: 1
                    }
            }
            let pokesOrigen;
            if (action.payload === "originals") {
                pokesOrigen = state.pokemons.filter(p => p.id_Pokemon);
            } else {
                pokesOrigen = state.pokemons.filter(p => p.id);
            }
            console.log(pokesOrigen)
                
            if (pokesOrigen?.length === 0) {
                alert("There is not pokemons created");
                return {
                    ...state,
                    filteredPokemons: state.pokemons,
                    page: 1
                }
            }
            return {
                ...state,
                filteredPokemons: pokesOrigen,
                page: 1
            }
        case 'FILTER_TYPE':
            if (action.payload === "default") {
                return {
                    ...state,
                    filteredPokemons: state.pokemons,
                    page: 1
                    }
            }
            let pokesType;
            pokesType = state.pokemons.filter(p => {
            if (p.createdInDB) {
                for (let i = 0; i < p.types.length; i++) {
                    if (p.types[i].name === action.payload) return p
                }
            }else{
                return p.types.includes(action.payload)
            }
            });

            if (pokesType.length === 0) {
                alert(`There is not pokemons ${action.payload} type`)
                return {
                    ...state,
                    filteredPokemons: state.pokemons,
                    page: 1
                }
            }
            return {
                ...state,
                filteredPokemons: pokesType,
                page: 1
            }
        case 'CREATE_POKEMON':
                return {
                    ...state,
                    pokemons: [...state.pokemons, action.payload]
                }
        case 'SET_CURRENT_PAGE': return {
                ...state,
                page: action.payload
            }

        case 'CLEAN':  return{
                ...state,
                pokemon: action.payload
            }

        case 'CLEAN_CACHE_ALL': return {
            ...state,
            pokemons: [],
            page: action.payload
        }
        
        default:
            return state
    }
};

export default rootReducer;