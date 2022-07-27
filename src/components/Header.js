import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../style/images/search-grey.png';
import SearchBar from './SearchBar';
import profileIcon from '../style/images/profile-grey.png';
import profileBlackIcon from '../style/images/profile-black.png';

function Header({ history, title, condition }) {
  const [inputSearch, setInputSearch] = useState(false);

  const handleSearch = () => {
    setInputSearch(!inputSearch);
  };

  const btnProfile = () => {
    const { pathname } = history.location;
    if (pathname === '/profile') {
      return profileBlackIcon;
    }
    return profileIcon;
  };

  return (
    <header className="header">
      <div className="container-btn-type">
        <Link to="/profile">
          <button type="button">
            <img
              src={ btnProfile() }
              alt="profile"
              data-testid="profile-top-btn"
              className="profile-btn"
            />
          </button>
        </Link>

        <h2 data-testid="page-title" className="title-foods-drinks">
          { title }
        </h2>

        {
          condition
        && (
          <button type="button" onClick={ handleSearch }>
            <img
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
              className="search-btn"
            />
          </button>
        )
        }
      </div>
      {
        inputSearch
        && (
          <SearchBar history={ history } />
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  condition: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
};

export default Header;
