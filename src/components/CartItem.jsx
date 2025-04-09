import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      updateQuantity(item.id, value);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-actions">
        <div className="quantity-control">
          <label htmlFor={`quantity-${item.id}`}>Qty:</label>
          <input
            id={`quantity-${item.id}`}
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </div>
        
        <div className="cart-item-subtotal">
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <button 
          className="remove-button"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;