import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { FilmsArray } from "../../shared/types";
import { changeId } from "../../redux/slices/mainSlice";

const Header = () => {
  //we take data for search results from store because the API doesn't allow search by titles
  const films: FilmsArray | undefined = useAppSelector(
    (state) => state.mainSlice.films
  );

  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  //allows to jump to another page without using a link
  const history = useHistory();

  const handleSearch = () => {
    //find index of the film with matching title
    const filmIndex = films
      ? films.findIndex((film) => film.title === inputValue)
      : -1;

    //change id of the film for film page
    if (filmIndex > -1) {
      if (films) dispatch(changeId(films[filmIndex].id));
    }

    //clean input field
    setInputValue("");

    //jump to the film page
    history.push("/film-page");
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
