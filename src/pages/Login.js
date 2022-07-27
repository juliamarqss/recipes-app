import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/login.css';
import loginsvg from '../images/loginsvg.svg';
import imageBack from '../style/images/login.png';

function Login({ history }) {
  const [login, setLogin] = useState({
    email: '',
    senha: '',
  });

  const validateEmail = () => {
    const { email } = login;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = () => {
    const { senha } = login;
    const NUM = 6;
    const teste = senha.length > NUM;
    return teste;
  };

  const handleChange = ({ id, value }) => {
    setLogin((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClick = () => {
    const { email } = login;
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
    history.push('/foods');
  };

  return (
    <div className="div-principal">
      <img src={ imageBack } alt="background" />

      <div className="container-login">

        <div id="login">
          <img src={ loginsvg } alt="icone de login" />
          <p>Sign in</p>
        </div>

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          data-testid="email-input"
          onChange={ (event) => handleChange(event.target) }
        />

        <input
          type="password"
          placeholder="Enter your password"
          id="senha"
          data-testid="password-input"
          onChange={ (event) => handleChange(event.target) }
        />

        <button
          id="button-login"
          type="button"
          disabled={ !(validateEmail() && validatePassword()) }
          data-testid="login-submit-btn"
          onClick={ () => handleClick() }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
