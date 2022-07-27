/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import appContext from '../context/Context';
import '../App.css';
import 'swiper/css';

function OtherRecipesFoods() {
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
    >
      {
        recommendation.map((recipe, index) => (
          <SwiperSlide
            key={ `${recipe.strMeal}-${index}` }
            data-testid={ `${index}-recomendation-card` }
            className="recommendations-card"
          >
            <img width="100px" src={ recipe.strMealThumb } alt="recommendation" />
            <span
              data-testid={ `${index}-recomendation-title` }
            >
              { recipe.strMeal }
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

export default OtherRecipesFoods;
