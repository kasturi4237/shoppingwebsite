import { useState, useEffect } from 'react';
import { getProducts, getProductsByCategory, getCategories } from '../services/api';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category change
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setIsLoading(true);
      try {
        let productsData;
        if (selectedCategory) {
          productsData = await getProductsByCategory(selectedCategory);
        } else {
          productsData = await getProducts();
        }
        setProducts(productsData);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  // Filter products by search term
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="product-list-container">
      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <div className="loading">Loading products...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!isLoading && !error && (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;