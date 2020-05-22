import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MoviePage() {
  const route_parameters = useParams();
  const [movieData, set_movieData] = useState({}); //movieData is an object if we remove {} it doesnt work
  const imdb_id = route_parameters.imdb_id; // value from the url
  console.log("route_parameters :", imdb_id);

  async function fetchData() {
    const queryParam = encodeURIComponent(imdb_id);
    const movieDataOutput = await axios.get(
      `https://omdbapi.com/?apikey=5e041d03&i=${queryParam}`
    );
    console.log("data", movieDataOutput.data);
    set_movieData(movieDataOutput.data);
  }

  useEffect(() => {
    fetchData(); //fetch data whenever url changes.
  }, [imdb_id]);

  return (
    <div className="ml-5 mt-5">
      <h3>{movieData.Title}</h3>
      <h5>{movieData.Genre}</h5>
      <div className="row">
        <img
          className="col-md-4"
          src={movieData.Poster}
          class="img-responsive"
        ></img>
        <div className="col-md-8">
          <h5>DIRECTOR</h5>
          <p>{movieData.Director}</p>
          <h5>LANGUAGE</h5>
          <p>{movieData.Language}</p>
          <h5>Plot</h5>
          <p>{movieData.Plot}</p>
          <h5>IMDB RATING</h5>
          <p>{movieData.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}
