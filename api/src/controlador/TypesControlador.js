const {default: axios} = require("axios");
const {Type}= require("../db.js");

const types = async() => {
    try {
        let typePokemons = await axios.get("https://pokeapi.co/api/v2/type")
        let response = typePokemons.data.results?.map((res)=>{
            return {
                name: res.name
            }
        })
        response.forEach(async(r) => {
            await Type.findOrCreate({
                where:{
                    name: r.name
                }
            })
        });
   
    } catch (error) {
        return error.message
    }
}

const getAllTypes = async(req, res) => {
    try{
        const types = await Type.findAll()
        console.log(types)
        return res.status(200).json(types)
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

module.exports = {types,getAllTypes}; 