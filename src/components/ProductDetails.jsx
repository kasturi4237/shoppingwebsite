import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  if (isLoading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-container">
        <div className="product-image-large">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-info-detailed">
          <h1 className="product-title">{product.title}</h1>
          
          <div className="product-category-badge">
            {product.category}
          </div>
          
          <div className="product-price-large">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="product-rating">
            <span>Rating: {product.rating.rate}/5</span>
            <span className="rating-count">({product.rating.count} reviews)</span>
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            
            <button 
              className="add-to-cart-button-large"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          
          <Link to="/" className="back-to-products">
            &larr; Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;