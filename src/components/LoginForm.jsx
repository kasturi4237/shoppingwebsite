import { useState } from 'react';
import { login } from '../services/api';
import { setAuthToken, setCurrentUser } from '../utils/auth';
import '../index.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    

    try {
      const data = await login(username, password);
      console.log('Login response:', data);
      
      if (data && data.token) {
        setAuthToken(data.token);
        setCurrentUser({ username });
        onLoginSuccess();
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="login-hint">
          <small>
            Hint: Try with username: 'johnd' and password: 'm38rmF$'
            <br />
            (These are test credentials for the Fake Store API)
          </small>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;