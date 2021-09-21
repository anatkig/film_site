import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { useGetFilmsByTitleQuery } from "../../redux/slices/apiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { putFilms } from "../../redux/slices/mainSlice";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { FilmIdObj } from "../../shared/types";

const Header = () => {
  const [inputValue, setInputValue] = useState<string>("");

  //gets films using RTK Query
  const { data, error } = useGetFilmsByTitleQuery(inputValue);

  const dispatch = useDispatch();
  const history = useHistory();
  const paramsFilmId = useParams<FilmIdObj>().filmId;

  useEffect(() => {
    if (!error) {
      //puts films into the main Slice
      dispatch(putFilms(data?.data));
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (inputValue && paramsFilmId) {
      //if the user starts searching on film page,
      //he is automatically transfered to main page with the search results
      history.push("/");
    }
  }, [inputValue, history, paramsFilmId]);

  useEffect(() => {
    window.onclick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).className !== "input") {
        setInputValue("");
      }
    };
  });

  return (
    <div className="header">
      <h1>Film World</h1>
      <div className="mini-form">
        <Link to="/">
          <button className="home-button">Home</button>
        </Link>
        <div className="input-container">
          <input
            list="films"
            className="input"
            value={inputValue}
            placeholder="search for a film..."
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="search-button">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
