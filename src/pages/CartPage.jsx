import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Cart from '../components/Cart';
import { isAuthenticated } from '../utils/auth';

const CartPage = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="cart-page">
      <Header />
      <main className="main-content">
        <div className="container">
          <Cart />
        </div>
      </main>
    </div>
  );
};

export default CartPage;