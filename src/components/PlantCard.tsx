import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/currency';

interface Plant {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

interface PlantCardProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (plant.inStock) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: plant.id,
          name: plant.name,
          price: plant.price,
          image: plant.image
        }
      });
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (plant.inStock) {
      // Navigate to checkout with this specific item
      navigate('/checkout', {
        state: {
          buyNowItem: {
            id: plant.id,
            name: plant.name,
            price: plant.price,
            image: plant.image
          }
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/plant/${plant.id}`}>
        <div className="relative">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              plant.inStock 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {plant.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {plant.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <Link to={`/plant/${plant.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors duration-200">
            {plant.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {plant.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-600">
            {formatPrice(plant.price)}
          </span>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleAddToCart}
              disabled={!plant.inStock}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                plant.inStock
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{plant.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
            
            {plant.inStock && (
              <button
                onClick={handleBuyNow}
                className="w-full px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-md"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;