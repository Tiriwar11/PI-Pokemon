const { Router } = require("express");
const {getAllPokemons,getIdPokemon,postPokemon} = require("../controlador/PokemonControlador.js")
const router = Router();

router.get('/',getAllPokemons)
router.get('/:idPokemon',getIdPokemon)
router.post('/create',postPokemon)


module.exports = router;