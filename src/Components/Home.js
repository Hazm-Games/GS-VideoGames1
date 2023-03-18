import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="hero-image">
        <div className="hero-text">
          <h1>
            Shop at H<font color="#B5F000">A</font>ZM GAMES SITE
          </h1>
          <p>The only place to find the best games!</p>

          <button>
            <Link
              className="link"
              style={{
                color: "#B5F000",
                textDecoration: "none",
                fontWeight: "1000",
              }}
              to={`/products`}
            >
              Browse games
            </Link>
          </button>
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-links">
            <h3>Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/playstation">Playstation Games</Link>
              </li>
              <li>
                <Link to="/xbox">Xbox Games</Link>
              </li>
              <li>
                <Link to="/nintendo">Nintendo Games</Link>
              </li>
              <li>
                <Link to="/deals">Deals</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>Connect with Us</h3>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 HAZM GAMES</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
