import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import action, { fetchAPI } from '../redux/actions';
import { EMAIL } from '../redux/reducers/user';
import '../styles/login.css';
import logo from './Wallet.png';

class Login extends React.Component {
  state = {
    email: '',
    isloginButtonDisabled: true,
    senha: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.validation(); });
  };

  handleSubmmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(action(EMAIL, email));
    dispatch(fetchAPI());
    history.push('/carteira');
  };

  validation = () => {
    const { email, senha } = this.state;
    const minCaracteres = 6;
    const verifyEmail = /\S+@\S+\.\S+/;
    if (senha.length >= minCaracteres && email.match(verifyEmail)) {
      this.setState({ isloginButtonDisabled: false });
    } else {
      this.setState({ isloginButtonDisabled: true });
    }
  };

  render() {
    const { email, isloginButtonDisabled, senha } = this.state;
    return (
      <main className="main-login">
        <section className="left-login">
          <h1>Faça o seu Login!</h1>
          <img src={ logo } alt="wallet" className="login-img" />
        </section>
        <section className="right-login">
          <form onSubmit={ this.handleSubmmit } className="card-login">
            <h1>Login</h1>
            <label htmlFor="email" className="text-field">
              <h4>Email:</h4>
              <input
                placeholder="Insira seu Email"
                type="text"
                data-testid="email-input"
                onChange={ this.handleChange }
                value={ email }
                name="email"
                required
              />
            </label>
            <label htmlFor="senha" className="text-field">
              <h4>Senha:</h4>
              <input
                placeholder="Insira sua Senha"
                data-testid="password-input"
                onChange={ this.handleChange }
                value={ senha }
                type="password"
                name="senha"
                required
              />
            </label>
            <button
              type="submit"
              disabled={ isloginButtonDisabled }
              className="btn-login"
            >
              Entrar
            </button>
          </form>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
