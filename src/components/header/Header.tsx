import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { FilmsArray } from "../../shared/types";
import { useDispatch } from "react-redux";
import { useGetAllFilmsQuery } from "../../redux/slices/apiSlice";
import { putCurrentFilmTitle, putFilms } from "../../redux/slices/mainSlice";
import { useState, useEffect } from "react";

const Header = () => {
  const [films, setFilms] = useState<FilmsArray | undefined>();
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  //gets films using RTK Query
  const { data, error } = useGetAllFilmsQuery("movies");

  useEffect(() => {
    if (!error) {
      //puts films into the main Slice in the store because it is easier to work with
      setFilms(data?.data);

      dispatch(putFilms(films));
      dispatch(
        putCurrentFilmTitle(
          films?.[Math.floor(Math.random() * films.length)].title
        )
      );
    }
  }, [data, error, dispatch, films]);

  //allows to jump to another page without using a link
  const pageJumperFromRouter = useHistory();

  const handleSearch = () => {
    //find index of the film with matching title
    const film = films?.find((film) => film.title === inputValue);

    //change id of the film for film page
    if (film) {
      //clean input field
      setInputValue("");

      //jump to the film page
      pageJumperFromRouter.push(`/film_page/${film.title}`);
    }
  };

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
          <datalist id="films">
            {films?.map((film) => (
              <option value={film.title} key={film.id} />
            ))}
          </datalist>
          <button onClick={handleSearch} className="search-button">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
