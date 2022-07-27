/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../style/images/share.png';

function DoneRecipesCard({ type }) {
  // const [isCopied, setIsCopied] = useState(false);
  const [doneCards, setDoneCards] = useState([]);

  useEffect(() => {
    let storageDoneCard = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!storageDoneCard) {
      storageDoneCard = {
        alcoholicOrNot: '',
        category: '',
        doneDate: '',
        id: '',
        image: '',
        name: '',
        nationality: '',
        tags: '',
        type: '',
      };
    }
    if (type !== '') {
      const filterType = storageDoneCard.filter((filter) => (
        filter.type === type
      ));
      setDoneCards(filterType);
    } else {
      setDoneCards(storageDoneCard);
    }
  }, [setDoneCards, type]);

  return (
    <div>
      {
        doneCards.length > 0
        && doneCards.map((card, index) => (
          <div key={ card.name } className="container-done-card">

            <div className="container-done-card2">

              <Link to={ `/${card.type}s/${card.id}` }>
                <img
                  src={ card.image }
                  alt="card-recipes-done"
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

                  {/* { isCopied ? <p>Link copied!</p> : null } */}
                  <button
                    type="button"
                    onClick={ () => {
                      copy(`http://localhost:3000/${card.type}s/${card.id}`);
                      // setIsCopied(true);
                    } }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share-url"
                      className="share-btn"
                    />
                  </button>
                </div>

                <div>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {card.nationality}
                  </p>

                  <p>
                    {card.category}
                  </p>

                  <p>
                    {card.alcoholicOrNot}
                  </p>

                  <p data-testid={ `${index}-horizontal-done-date` }>
                    { card.doneDate }
                  </p>

                  {
                    card.tags.map((tag, idx) => {
                      if (idx < 2) {
                        return (
                          <div key={ idx } className="container-tags">
                            <p
                              data-testid={ `${index}-${tag}-horizontal-tag` }
                              className="tags"
                            >
                              { tag }
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        ))
      }
      {
        (doneCards.length === 0 || doneCards.id === '')
        && <div>You don&apos;t have done Recipes</div>
      }
    </div>
  );
}

DoneRecipesCard.propTypes = {
  type: PropTypes.string.isRequired,
};

export default DoneRecipesCard;
