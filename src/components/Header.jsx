import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { logout } from '../utils/auth';
import '../index.css';

const Header = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          ShopEase
        </Link>
        
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="cart-link">
                Cart
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;