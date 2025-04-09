import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import Popup from './Popup';

const Cart = () => {
  const { cartItems, total, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-amount">${total.toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <Link to="/" className="continue-shopping">
                Continue Shopping
              </Link>
              <button 
                className="checkout-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
      
      <Popup 
        message="Order placed successfully!" 
        show={showPopup} 
        onClose={closePopup} 
      />
    </div>
  );
};

export default Cart;