import React from 'react';

// Configuration for different category fields
const CATEGORY_CONFIGS = {
  school: {
    title: 'name',
    fields: [
      { key: 'schoolType', label: 'Type' },
      { key: 'contact', label: 'Contact' },
      { key: 'location', label: 'Location' }
    ]
  },
  college: {
    title: 'name',
    fields: [
      { key: 'collegeType', label: 'Type' },
      { key: 'contact', label: 'Contact' },
      { key: 'location', label: 'Location' }
    ]
  },
  restaurant: {
    title: 'name',
    fields: [
      { key: 'cuisineType', label: 'Cuisine' },
      { key: 'contact', label: 'Contact' },
      { key: 'priceRange', label: 'Price Range' }
    ]
  },
  hotel: {
    title: 'name',
    fields: [
      { key: 'hotelType', label: 'Type' },
      { key: 'contact', label: 'Contact' },
      { key: 'priceRange', label: 'Price Range' }
    ]
  },
  'police-station': {
    title: 'name',
    fields: [
      { key: 'stationType', label: 'Station Type' },
      { key: 'contact', label: 'Contact Number' },
      { key: 'address', label: 'Address' }
    ]
  },
  // Add more categories as needed
};

export const CategoryResultsRenderer = ({ categoryId, data, location }) => {
  // Get configuration for the current category
  const config = CATEGORY_CONFIGS[categoryId] || CATEGORY_CONFIGS.school;

  // If no data, show no results message
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">
          No results found in {location}.
        </p>
        <p className="text-gray-500 mt-2">
          Try searching for a different location.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-center mb-6 text-gray-600">
        Found {data.length} results in {location}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {item[config.title]}
              </h2>

              {/* Rating (if available) */}
              {item.ratingInStar && (
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 mr-1">
                    <span className="mr-1">⭐</span>
                    <span className="font-medium">
                      {item.ratingInStar}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({item.ratingCount || 0} reviews)
                  </span>
                </div>
              )}

              {/* Dynamic Fields */}
              <div className="space-y-2">
                {config.fields.map((field) => (
                  item[field.key] && (
                    <p key={field.key} className="text-gray-700">
                      <span className="font-medium">{field.label}:</span>{' '}
                      {item[field.key]}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryResultsRenderer;