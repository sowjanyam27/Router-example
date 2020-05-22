import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav>
      <NavLink
        className="ml-5"
        style={{ fontWeight: "bold", color: "black" }}
        exact
        to="/"
      >
        Home
      </NavLink>
      <NavLink className="ml-5 test" to="/about">
        About
      </NavLink>
      <NavLink className="ml-5 test" to="/discover">
        DiscoverMovies
      </NavLink>
    </nav>
  );
}
