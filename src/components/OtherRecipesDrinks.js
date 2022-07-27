/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import appContext from '../context/Context';
import '../App.css';
import 'swiper/css';

function OtherRecipesDrinks() {
  const { recommendation } = useContext(appContext);

  const SwiperButtonPrevious = ({ children }) => {
    const swiper = useSwiper();
    return (
      <button
        onClick={ () => swiper.slidePrev() }
      >
        {children}
      </button>
    );
  };

  const SwiperButtonNext = ({ children }) => {
    const swiper = useSwiper();
    return (
      <button
        onClick={ () => swiper.slideNext() }
      >
        {children}
      </button>
    );
  };

  return (
    <Swiper
      modules={ [Navigation, A11y] }
      slidesPerView={ 3 }
      navigation
      className="contains-recommendations"
    >
      {
        recommendation.map((recipe, index) => (
          <SwiperSlide
            key={ `${recipe.strDrink}-${index}` }
            data-testid={ `${index}-recomendation-card` }
            className="recommendations-card"
          >
            <img width="100px" src={ recipe.strDrinkThumb } alt="recommendation" />
            <span
              data-testid={ `${index}-recomendation-title` }
            >
              { recipe.strDrink }
            </span>
          </SwiperSlide>
        ))
      }
      <div className="recommendations-btn">
        <SwiperButtonPrevious>
          Previous
        </SwiperButtonPrevious>
        <SwiperButtonNext>
          Next
        </SwiperButtonNext>
      </div>
    </Swiper>
  );
}

export default OtherRecipesDrinks;
