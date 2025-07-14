import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield, Leaf } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/currency';
import plantsData from '../data/plants.json';

const PlantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const plant = plantsData.find(p => p.id === parseInt(id || '0'));

  if (!plant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plant Not Found</h1>
          <Link
            to="/plants"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plants
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
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

  const handleBuyNow = () => {
    if (plant && plant.inStock) {
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

  const features = [
    {
      icon: <Truck className="h-6 w-6 text-emerald-600" />,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-600" />,
      title: "30-Day Guarantee",
      description: "Healthy arrival guaranteed"
    },
    {
      icon: <Leaf className="h-6 w-6 text-emerald-600" />,
      title: "Care Support",
      description: "Expert guidance included"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/plants"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plants
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <img
                src={`/${plant.image}`}
                alt={plant.name}
                className="w-full h-96 lg:h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  plant.inStock 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {plant.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {plant.category}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {plant.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  {formatPrice(plant.price)}
                </span>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <Heart className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {plant.description}
              </p>

              <div className="space-y-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!plant.inStock}
                  className={`w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    plant.inStock
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>{plant.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                
                {plant.inStock && (
                  <button
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-orange-500 text-white font-semibold text-lg rounded-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  >
                    <span>Buy Now</span>
                  </button>
                )}
              </div>

              {/* Features */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.icon}
                      <div>
                        <p className="font-medium text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Care Instructions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Care Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Watering</h3>
              <p className="text-gray-600">Water when top inch of soil feels dry to touch.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☀️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Light</h3>
              <p className="text-gray-600">Bright, indirect light. Avoid direct sunlight.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌡️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Temperature</h3>
              <p className="text-gray-600">Keep between 65-75°F (18-24°C) for optimal growth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailPage;