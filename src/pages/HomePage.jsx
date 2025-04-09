import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import { isAuthenticated } from '../utils/auth';

const HomePage = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <div className="container">
          <h1>Our Products</h1>
          <ProductList />
        </div>
      </main>
    </div>
  );
};

export default HomePage;