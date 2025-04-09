import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { isAuthenticated } from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>ShopEase</h1>
        <p>Your one-stop shopping destination</p>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;