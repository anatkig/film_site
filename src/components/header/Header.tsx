import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { FilmsArray } from "../../shared/types";
import { changeId } from "../../redux/slices/mainSlice";

const Header = () => {
  const films: FilmsArray | undefined = useAppSelector(
    (state) => state.mainSlice.films
  );
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [filmTitle, setFilmTitle] = useState<string>("");
  const history = useHistory();

  const handleSearch = () => {
    const filmIndex = films
      ? films.findIndex((film) => film.title === inputValue)
      : -1;

    if (filmIndex > -1) {
      if (films) dispatch(changeId(films[filmIndex].id));
    }
    history.push("/film_page");
  };
  return (
    <>
      <h1>Film World</h1>
      <div className="mini_form">
        <Link to="/">
          <button className="home_button">Home</button>
        </Link>
        <div className="input_container">
          <input
            className="input"
            value={inputValue}
            placeholder="search for a film..."
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button onClick={handleSearch} className="search_button">
            <SearchIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
