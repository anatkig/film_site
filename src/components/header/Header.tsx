import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetFilmByTitleQuery } from "../../redux/slices/apiSlice";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const Header = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filmTitle, setFilmTitle] = useState<string>("");
  const history = useHistory();

  const { data, error, isLoading } = useGetFilmByTitleQuery(filmTitle);
  console.log(data);
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      setFilmTitle(inputValue);
      if (!error) {
        history.push("/film_page");
      }
    }
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
            onKeyUp={handleSearch}
          />
          <button className="search_button">
            <SearchIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
