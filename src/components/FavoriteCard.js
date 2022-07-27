import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonsFavShare from './ButtonsFavShare';

function FavoriteCard({ type }) {
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    let storageFavoriteCard = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storageFavoriteCard) {
      storageFavoriteCard = {
        alcoholicOrNot: '',
        category: '',
        id: '',
        image: '',
        name: '',
        nationality: '',
        type: '',
      };
    }
    if (type !== '') {
      const filterType = storageFavoriteCard.filter((filter) => (
        filter.type === type
      ));
      setFavoriteCards(filterType);
    } else {
      setFavoriteCards(storageFavoriteCard);
    }
  }, [setFavoriteCards, type]);

  return (
    <div>
      {
        favoriteCards.length > 0
        && favoriteCards.map((card, index) => (
          <div key={ card.name } className="container-done-card">

            <div className="container-done-card2">

              <Link to={ `/${card.type}s/${card.id}` }>
                <img
                  src={ card.image }
                  alt="card-recipes-favorite"
                  width="100px"
                  data-testid={ `${index}-horizontal-image` }
                  className="img-card"
                />
              </Link>

              <div className="container-done-card3">

                <div className="container-done-card4">
                  <p data-testid={ `${index}-horizontal-name` } className="name-card">
                    { card.name }
                  </p>

                  <ButtonsFavShare
                    copyUrl={ `http://localhost:3000/${card.type}s/${card.id}` }
                    details={ card }
                    type={ card.type }
                    testId={ `${index}-horizontal-` }
                    update={ setFavoriteCards }
                  />
                </div>

                <div className="container-info">
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {card.nationality}
                  </p>

                  <p>
                    {card.category}
                  </p>

                  <p>
                    {card.alcoholicOrNot}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))
      }
      {
        (favoriteCards.length === 0 || favoriteCards.id === '')
        && <div>You don&apos;t have Favorites Recipes</div>
      }
    </div>
  );
}

FavoriteCard.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FavoriteCard;
