import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilterChange, searchQuery, filters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const tierOptions = [
    { id: 'all', label: 'All Tiers', color: 'bg-muted' },
    { id: 'diamond', label: 'Diamond', color: 'bg-blue-500' },
    { id: 'platinum', label: 'Platinum', color: 'bg-purple-500' },
    { id: 'gold', label: 'Gold', color: 'bg-yellow-500' },
    { id: 'silver', label: 'Silver', color: 'bg-gray-400' },
    { id: 'bronze', label: 'Bronze', color: 'bg-amber-600' }
  ];

  const countryOptions = [
    { id: 'all', label: 'All Countries' },
    { id: 'us', label: 'United States' },
    { id: 'uk', label: 'United Kingdom' },
    { id: 'ca', label: 'Canada' },
    { id: 'au', label: 'Australia' },
    { id: 'de', label: 'Germany' },
    { id: 'fr', label: 'France' },
    { id: 'jp', label: 'Japan' },
    { id: 'kr', label: 'South Korea' }
  ];

  const handleFilterChange = (type, value) => {
    onFilterChange({
      ...filters,
      [type]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search users by username..."
            value={searchQuery}
            onChange={(e) => onSearch(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          iconName="Filter"
          iconPosition="left"
        >
          Filters
        </Button>
      </div>
      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-card rounded-lg border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Filter Options</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onFilterChange({ tier: 'all', country: 'all', minBalance: '' });
              }}
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tier
              </label>
              <div className="space-y-2">
                {tierOptions?.map((tier) => (
                  <button
                    key={tier?.id}
                    onClick={() => handleFilterChange('tier', tier?.id)}
                    className={`flex items-center space-x-2 w-full p-2 rounded-md text-sm transition-smooth ${
                      filters?.tier === tier?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${tier?.color}`}></div>
                    <span>{tier?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Country
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {countryOptions?.map((country) => (
                  <button
                    key={country?.id}
                    onClick={() => handleFilterChange('country', country?.id)}
                    className={`flex items-center w-full p-2 rounded-md text-sm transition-smooth ${
                      filters?.country === country?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    {country?.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Balance Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum Balance
              </label>
              <Input
                type="number"
                placeholder="Enter minimum EBNX"
                value={filters?.minBalance}
                onChange={(e) => handleFilterChange('minBalance', e?.target?.value)}
              />
              <div className="mt-2 space-y-1">
                {[1000, 5000, 10000, 25000, 50000]?.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleFilterChange('minBalance', amount?.toString())}
                    className="block w-full text-left p-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {amount?.toLocaleString()} EBNX+
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(filters?.tier !== 'all' || filters?.country !== 'all' || filters?.minBalance) && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Filter" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Active Filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters?.tier !== 'all' && (
                  <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    <span>Tier: {filters?.tier}</span>
                    <button
                      onClick={() => handleFilterChange('tier', 'all')}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                )}
                {filters?.country !== 'all' && (
                  <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-sm">
                    <span>Country: {countryOptions?.find(c => c?.id === filters?.country)?.label}</span>
                    <button
                      onClick={() => handleFilterChange('country', 'all')}
                      className="hover:bg-secondary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                )}
                {filters?.minBalance && (
                  <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-sm">
                    <span>Min: {parseInt(filters?.minBalance)?.toLocaleString()} EBNX</span>
                    <button
                      onClick={() => handleFilterChange('minBalance', '')}
                      className="hover:bg-accent/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;