import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useAppSelector } from "../../redux/store/hooks";
import { useState } from "react";

const Header = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const films = useAppSelector((store) => store.mainSlice.films);

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
      pageJumperFromRouter.push(`/film_site/${film.id}`);
    }
  };
  console.log(inputValue);
  return (
    <div className="header">
      <h1>Film World</h1>
      <div className="mini-form">
        <Link to="/film_site">
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
