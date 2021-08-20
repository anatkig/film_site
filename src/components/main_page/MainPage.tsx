import { Link } from "react-router-dom";
import { SyntheticEvent } from "react";
import noposter from "../../assets/noposter.jpg";
import { FilmsArray } from "../../shared/types";
import { useAppSelector } from "../../redux/store/hooks";

const MainPage = () => {
  //we take data for search results from store because the API doesn't allow search by titles
  const films: FilmsArray | undefined = useAppSelector(
    (state) => state.mainSlice.films
  );

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
              <Link to={{ pathname: `/film_page/${film.id}` }} key={film.id}>
                <div>
                  <h3>{film.title}</h3>
                  <div>
                    <img
                      id="image"
                      src={film.poster_path}
                      onError={handleImageError}
                      alt={film.title}
                    />
                  </div>
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
