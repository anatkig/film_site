import { Link } from "react-router-dom";
import { SyntheticEvent } from "react";
import noposter from "../../assets/noposter.jpg";
import { useAppSelector } from "../../redux/store/hooks";

const MainPage = () => {
  const films = useAppSelector((store) => store.mainSlice.films);

  //some images don't load. this method loads the default image
  const handleImageError = (event: SyntheticEvent) => {
    (event.target as HTMLImageElement).src = `${noposter}`;
  };

  return (
    <>
      {films ? (
        <>
          <div className="main-page-film-container">
            {films.map((film) => (
              <Link to={{ pathname: `/film_site/${film.id}` }} key={film.id}>
                <div>
                  <h3>{film.title}</h3>

                  <img
                    id="image"
                    src={film.poster_path}
                    onError={handleImageError}
                    alt={film.title}
                  />
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        "API is not working for some reason"
      )}
    </>
  );
};

export default MainPage;
