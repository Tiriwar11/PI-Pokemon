import React from "react";
import styles from "./SearchBar.module.css";
import searchImage from "../tools/search.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemonByName } from "../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [, setErrors] = useState({});

  const validations = (nameInput) => {
    let errors = {};
    if (nameInput.search("[0-9]") !== -1) {
      errors.nameInput =
        "Sorry, no name has a number. Try typing the name again!";
    }
    if (nameInput.search("[^A-Za-z0-9_]") !== -1) {
      errors.nameInput =
        "Sorry, no name has symbols. Try typing the name again!";
    }
    return errors;
  };

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
    setErrors(validations(name));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (name !== ""){
      dispatch(searchPokemonByName(name));
      setName("");
    }else{
      alert("You must insert the name of the Pokemon");
    }
  }
    return (
      <React.Fragment>
        <div className={styles.input} >
          <form className={styles.input} onSubmit={(e) => handleSubmit(e)}>
            <input
              className={styles.inputName}
              type="text"
              value={name}
              placeholder="Pokemon Name..."
              onChange={(e) => handleInputChange(e)}
            />
            <button className={styles.button} type="submit">
              <img
                className={styles.buttonImage}
                src={searchImage}
                alt="imageSearch"
              />
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  };
  
  export default SearchBar;
  