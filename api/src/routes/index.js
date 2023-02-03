const { Router } = require("express");
const typeRouter = require("./TypesRouter.js")
const getAllPokemons = require("./PokemonRouter.js")
// const getIdPokemon = require("./PokemonRouter.js")
// const getNamePokemon = require("./PokemonRouter.js")
// const postPokemon = require("./PokemonRouter.js")
const router = Router();

router.use("/types",typeRouter)
router.use("/pokemons", getAllPokemons)
// router.use("/pokemons/:idPokemon",getIdPokemon)
// router.use("/pokemons/:name",getNamePokemon)

module.exports = router;
