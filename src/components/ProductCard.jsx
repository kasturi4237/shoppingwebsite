import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    
    // Show "Added to cart" message
    setShowAddedMessage(true);
    
    // Hide message after 2 seconds
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image" 
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button 
        className="add-to-cart-button"
        onClick={handleAddToCart}
      >
        {showAddedMessage ? 'Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;