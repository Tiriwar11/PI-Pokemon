const { Router } = require("express");
const {getAllTypes} = require("../controlador/TypesControlador.js")

const router = Router();

router.get('/',getAllTypes)

module.exports = router;
