const validations = (input) => {
    
    let err = {};

    // let search = pokemons.find(e => e.name.toLowerCase() === input.name.toLowerCase());

    // if (search){
    //     err.name = "There is already a Pokemon with that name"
    // } 

    if(!input.name) {
        err.name = "The name is required"
    }

    if(input.name.search("[^A-Za-z0-9_]") !== -1) {
        err.name = "The name must not have symbols"
    }

    if(input.name.search("[0-9]") !== -1 ) {
    err.name = "The name must not have numbers"
    }

    if (input.name.length > 20) {
        err.name = "The name must be between 1 and 20 characters"
    }

    if (input.name[0] === " ") {
        err.name = "The first character cannot be a space"
    }

    if(input.secondType === "" && input.firstType === "") {
        err.types = "At least one type is required"
    }

    if(input.secondType !== "" && input.firstType !== "" && input.secondType === input.firstType) {
        err.types = "You can't repeat the same type of pokemon"
    }

    if(input.health > 500 || input.health <= 0) {
        err.health = "Value must be greater than 0 and less than 500"
    }

    if(input.attack > 500 || input.attack <=  0) {
        err.attack = "Value must be greater than 0 and less than 500"
    }

    if(input.defense > 500 || input.defense <=  0) {
        err.defense = "Value must be greater than 0 and less than 500"
    }

    if(input.speed > 500 || input.speed <=  0) {
        err.speed = "Value must be greater than 0 and less than 500"
    }

    if(input.height > 500 || input.height <=  0) {
        err.height = "Value must be greater than 0 and less than 300"
    }

    if(input.weight > 999 || input.weight <=  0) {
        err.weight = "Value must be greater than 0 and less than 999"
    }

    return err;
};

export default validations;