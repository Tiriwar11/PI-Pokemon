import React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import LandingPage from './pages/LandingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';

const App = () => {
  return (
      <React.Fragment>     
          <Route exact path="/" component={LandingPage}/> 
          <Route exact path="/pokemons" component={HomePage}/>  
          <Route exact path="/detail/:idPokemon" component={DetailPage} />
          <Route exact path="/pokemons/create" component={CreatePage} />
      </React.Fragment>
  );
}

export default App;
