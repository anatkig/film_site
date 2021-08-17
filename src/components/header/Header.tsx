import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>Film World</h1>
      <div className="miniForm">
        <Link to="/">
          <button>Home</button>
        </Link>
        <input placeholder="search for a film" />
      </div>
    </>
  );
};

export default Header;
