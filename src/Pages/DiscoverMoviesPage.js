import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";
import axios from "axios";

export default function DiscoverMoviesPage() {
  const history = useHistory(); // navigation purposes, we provide access to the history object
  const route_parameters = useParams(); // :params in the url
  const searchParams = route_parameters.searchtext;
  console.log("searchParams is :", searchParams);

  const [searchText, set_searchText] = useState("");
  const [status, set_status] = useState("idle");
  const [movieResult, set_movies] = useState("");

  const search = async () => {
    const queryParam = encodeURIComponent(searchParams);
    if (queryParam !== "undefined") {
      // checking against undefined bcz not to render anything
      set_status("searching"); // for the first time
      const outputData = await axios.get(
        `https://omdbapi.com/?apikey=5e041d03&s=${queryParam}`
      );

      set_status("done");

      const MoviesList = outputData.data.Search;
      console.log(MoviesList);
      if (MoviesList) {
        set_movies(MoviesList);
      }
    }
  };

  //when searchText changes url changes and then searchParams changes and then
  //DOM has to rerender with the new results .So giving searchParams as dependencies
  useEffect(() => {
    search();
  }, [searchParams]); //render whenever the search result changes

  /*    */

  // navigating the url to example : /discover/star%20wars
  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };

  return (
    <div className="m-4">
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button onClick={navigateToSearch}>Search</button>
      </p>
      {status === "searching" ? "Searching..." : null}
      <div className="row">
        {movieResult &&
          movieResult.map((movie, i) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
              <Link to={`/movie/${movie.imdbID}`}>
                {movie.Title} (<em>{movie.imdbID}</em>)
                <img src={movie.Poster} alt="Poster"></img>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
