import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Users, Award } from 'lucide-react';
import PlantCard from '../components/PlantCard';
import { formatPrice } from '../utils/currency';
import plantsData from '../data/plants.json';

interface Plant {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

const HomePage: React.FC = () => {
  const [featuredPlants, setFeaturedPlants] = useState<Plant[]>([]);

  useEffect(() => {
    // Get 4 random plants for featured section
    const shuffled = [...plantsData].sort(() => 0.5 - Math.random());
    setFeaturedPlants(shuffled.slice(0, 4));
  }, []);

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-emerald-600" />,
      title: "Premium Quality",
      description: "Hand-selected plants from trusted growers, ensuring the healthiest specimens for your home."
    },
    {
      icon: <Heart className="h-8 w-8 text-emerald-600" />,
      title: "Expert Care Guides",
      description: "Comprehensive care instructions and ongoing support to help your plants thrive."
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Plant Community",
      description: "Join thousands of plant enthusiasts sharing tips, photos, and growing experiences."
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "Satisfaction Guarantee",
      description: "30-day guarantee on all plants. If you're not happy, we'll make it right."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transform Your Space with 
                <span className="text-emerald-300 block">Beautiful Plants</span>
              </h1>
              <p className="text-xl text-emerald-100 leading-relaxed">
                Discover our curated collection of premium indoor and outdoor plants. 
                From beginners to experts, we have the perfect green companions for every home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/plants"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Shop Plants
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/blogs"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-800 transition-all duration-200"
                >
                  Learn Plant Care
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="src/img/homeplant.jpg"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Green Paradise?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to helping you create the perfect green space with premium plants and expert guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-lg pt-12 pb-8 px-6 flex flex-col items-center text-center border-l-4 border-emerald-500 group hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 bg-emerald-100 border-4 border-white rounded-full flex items-center justify-center shadow-md">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Plants
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover some of our most popular plants, perfect for adding life and beauty to any space.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/plants"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              View All Plants
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Plant Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy plant parents who have transformed their homes with our premium plants and expert care guides.
          </p>
          <Link
            to="/plants"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Browse Our Collection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;