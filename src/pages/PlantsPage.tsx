import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import FilterBar from "../components/FilterBar";
import plantsData from "../data/plants.json";

interface Plant {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

const PlantsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [plants, setPlants] = useState<Plant[]>(plantsData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(plantsData.map((plant) => plant.category))
  );

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams, categories]);

  useEffect(() => {
    if (selectedCategory) {
      setPlants(
        plantsData.filter((plant) => plant.category === selectedCategory)
      );
    } else {
      setPlants(plantsData);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Green Paradise.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium plants for every space and skill level. From
            low-maintenance succulents to statement-making tropical plants, find
            your perfect green companion.
          </p>
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {plants.length} plants
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {plants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No plants found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantsPage;
