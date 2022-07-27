import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../style/images/do-utilizador.png';
import '../style/profile.css';

function Profile({ history }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    let userEmail = JSON.parse(localStorage.getItem('user'));
    if (!userEmail) {
      userEmail = {
        email: '',
      };
    }
    setUser(userEmail.email);
  }, [setUser]);

  const handleLogout = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" condition={ false } history={ history } />
      <div className="container-profile">
        <img
          alt="profileIcon"
          src={ profileIcon }
          className="profileIcon"
        />

        <span data-testid="profile-email" className="username">{ user }</span>

        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
          className="btn-done-recipes"
        >
          <span>Done Recipes</span>
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
          className="btn-fav-recipes"
        >
          <span>Favorite Recipes</span>
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
          className="btn-logout"
        >
          <span>Logout</span>
        </button>
      </div>

      <Footer history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Profile;
