const { Router } = require('express');
const { Pokemon,Type} = require("../db.js");


// GET /pokemons:
const getAllPokemons = async (req, res) => {
    try {     
        //Traemos los pokemons de la api                                
        const apiPokemon = fetch("https://pokeapi.co/api/v2/pokemon?limit=40")
            .then(data => data.json())
            .then(json => Promise.all(json.results.map(poke => fetch(poke.url)
                .then(data => data.json())
            )))
        //Traemos los pokemons de la base de datos
        const dataBasePokemon = Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }})
        
        return Promise.all([apiPokemon,dataBasePokemon])

        .then((pokemons) => { 
            const apiPoke = pokemons[0].map( p => {
                return {
                    id_Pokemon: p.id,
                    name: p.name,
                    health: p.stats[0].base_stat,
                    attack: p.stats[1].base_stat,
                    defense: p.stats[2].base_stat, 
                    speed: p.stats[5].base_stat, 
                    height: p.height, 
                    weight: p.weight,
                    types: p.types.map(p => p.type.name),
                    image: p.sprites.other["home"].front_default,
                }});
            
            const dbPoke= pokemons[1].map( p => {
                console.log(p.types)
                return {
                    id: p.id,
                    name: p.name,
                    health: p.health,
                    attack: p.attack,
                    defense: p.defense,
                    speed: p.speed ,
                    height: p.height, 
                    weight: p.weight,
                    types: p.types,
                    image: p.image,
                }
            });
        
            const allPokemons = apiPoke.concat(dbPoke); 

            const name = req.query.name;
            if (name) {
                let pokemonByName = allPokemons.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()))
                if(pokemonByName) {
                    return res.status(200).send(pokemonByName);
                } else{
                    return res.status(404).send("Lo sentimos, el Pokemon no existe. Intenta con otro nombre");
                }
            }
            res.status(200).send(allPokemons);
            });

    } catch (error) {
        return res.status(404).send(error.message)
    }
};

////// GET /pokemons/{idPokemon}
const getIdPokemon = async(req,res) => {
    try {
        //Guardar cada Pokemon con su respectivo ID en un array
        let arrayPokemon = [];
        for(let i = 1; i <= 40; i++) {
            arrayPokemon.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`))
        } 
        const apiPokemon = Promise.all(arrayPokemon)
        .then((pokeData) => Promise.all(pokeData.map(result => result.json())));
        //Traemos todos los Pokemons de la data base
        const dataBasePokemon = Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })
            
        return Promise.all([apiPokemon,dataBasePokemon])

        .then((pokemons) => { 
            const apiPoke = pokemons[0].map( p => {
                return {
                    name: p.name,
                    id_Pokemon: p.id,
                    health: p.stats[0].base_stat,
                    attack: p.stats[1].base_stat,
                    defense: p.stats[2].base_stat, 
                    speed: p.stats[5].base_stat, 
                    height: p.height, 
                    weight: p.weight,
                    types: p.types.map(p => p.type.name),
                    image: p.sprites.other["home"].front_default
                }
            });
                
            const dbPoke = pokemons[1].map( p => {
                return {
                    name: p.name,
                    id: p.id_Pokemon,
                    health: p.health,
                    attack: p.attack,
                    defense: p.defense,
                    speed: p.speed ,
                    height: p.height, 
                    weight: p.weight,
                    image: p.image
                }
            });
                    
            let {idPokemon} = req.params;
            if (idPokemon.search('[a-zA-Z]+') === -1){
                idPokemon = parseInt(idPokemon, 10)
            }
            const allPokemons = apiPoke.concat(dbPoke);
            const pokemonFinded = allPokemons.find( pokemon => {
                return (idPokemon === pokemon.id_Pokemon)   
            });
            if(!pokemonFinded) {
                return res.status(404).send("Lo sentimos, el Pokemon no existe.");
            }  
            res.status(200).json(pokemonFinded);
        });
                
       } catch (error) {
        return res.status(404).send(error.message)
      }
}


const postPokemon = (req,res)=>{
    
    try {
        const {name, health, attack, defense, speed, height, weight,image,types} = req.body;

        const apiPokemon = fetch("https://pokeapi.co/api/v2/pokemon?limit=40")
            .then(data => data.json())
            .then(json => Promise.all(json.results.map(poke => fetch(poke.url)
                .then(data => data.json())
            )))

            const dataBasePokemon = Pokemon.findAll({
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    }
                }
            })
                
            return Promise.all([apiPokemon,dataBasePokemon])

            .then(async(pokemons) => { 
                const apiPoke = pokemons[0].map( p => {
                    return {
                        name: p.name,
                    }});

                const dbPoke = pokemons[1].map( p => {
                    return {
                        name: p.name,
                    }});

                var auxApi,auxDB;
                apiPoke.map(n=>{
                    if(name===n.name){
                        return auxApi = name;
                    } 
                })
                dbPoke.map(n=>{
                    if(name===n.name){
                        return auxDB = name;
                    } 
                })
                // console.log(dataBasePokemons.name)
                console.log(auxDB)
                console.log(auxApi)
                if(auxApi === name || auxDB === name) {
                    return res.status(404).send("Lo sentimos, el Pokemon ya existe. Por favor intentar nuevamente!");
                }
                // console.log(types)
                let pokemonCreated = await Pokemon.create({
                            name,
                            image,
                            health,
                            attack,
                            defense, 
                            speed, 
                            height, 
                            weight
                });
                const dataBaseTypes = await Type.findAll({
                    where: {
                        name: types
                    }
                });
                pokemonCreated.addType(dataBaseTypes);
                return res.status(200).json(pokemonCreated);
            })

    } catch (error) {
        return res.status(404).send("El Pokemon no ha sido creado")
    }
}

module.exports = {getAllPokemons, getIdPokemon, postPokemon};

