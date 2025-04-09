import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductDetails from '../components/ProductDetails';
import { isAuthenticated } from '../utils/auth';

const ProductPage = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="product-page">
      <Header />
      <main className="main-content">
        <div className="container">
          <ProductDetails />
        </div>
      </main>
    </div>
  );
};

export default ProductPage;