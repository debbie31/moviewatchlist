import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import style from './style.module.css';

function Auth({ mode }) {
  const isLogin = mode === 'login';
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const heading = isLogin ? 'Sign In' : 'Sign Up';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(username, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.wrap}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.heading}>{heading}</h1>

        {!isLogin && (
          <input
            className={style.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        )}
        <input
          className={style.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          className={style.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          required
          minLength={6}
        />

        {error && <p className={style.error}>{error}</p>}

        <button className={style.submit} type="submit" disabled={loading}>
          {loading ? 'Please wait...' : heading}
        </button>

        <p className={style.switch}>
          {isLogin ? (
            <>
              New here?{' '}
              <Link to="/signup" className={style.link}>
                Sign up now
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className={style.link}>
                Sign in
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

Auth.propTypes = {
  mode: PropTypes.oneOf(['login', 'signup']).isRequired,
};

export default Auth;
