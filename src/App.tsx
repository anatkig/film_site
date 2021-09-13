import React from "react";
import "./App.scss";
import Header from "./components/header/Header";
import MainPage from "./components/main_page/MainPage";
import FilmPage from "./components/film_page/FilmPage";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Header />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/:filmId">
            <FilmPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
