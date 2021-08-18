import React from "react";
import "./App.scss";
import Header from "./components/header/Header";
import MainPage from "./components/main_page/MainPage";
import FilmPage from "./components/film_page/FilmPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/film-page">
            <FilmPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
