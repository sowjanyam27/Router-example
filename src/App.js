import React from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import DiscoverMoviesPage from "./Pages/DiscoverMoviesPage";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";
import MoviePage from "./Pages/MoviePage";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="App mt-5">
      <NavBar />
      <Switch>
        <Route path="/movie/:imdb_id" component={MoviePage} />
        <Route path="/discover/:searchtext?" component={DiscoverMoviesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
