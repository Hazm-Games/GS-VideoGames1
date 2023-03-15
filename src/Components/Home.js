import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="hero-image">
        <div className="hero-text">
          <h1>Shop at H<font color="#B5F000">A</font>ZM GAMES SITE</h1>
          <p>The only place to find the best games!</p>
          <button>
            <Link
              className="link"
              style={{ color: "#B5F000", textDecoration: "none", fontWeight: "1000" }}
              to={`/products`}
            >
              Browse games
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
