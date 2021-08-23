import React from "react";
import "./App.scss";
import Header from "./components/header/Header";
import MainPage from "./components/main_page/MainPage";
import FilmPage from "./components/film_page/FilmPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useGetAllFilmsQuery } from "./redux/slices/apiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { putFilms } from "./redux/slices/mainSlice";

function App() {
  //gets films using RTK Query
  const { data, error } = useGetAllFilmsQuery("movies");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      //puts films into the main Slice
      dispatch(putFilms(data?.data));
    }
  }, [data, error, dispatch]);

  return (
    <div className="App">
      <Router basename="/">
        <Header />
        <Switch>
          <Route path="/film_site/:filmId">
            <FilmPage />
          </Route>
          <Route path="/film_site">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
