import React from 'react';
import Icon from '../../../components/AppIcon';

const TimeFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'weekly', label: 'Weekly', icon: 'Calendar' },
    { id: 'monthly', label: 'Monthly', icon: 'CalendarDays' },
    { id: 'all-time', label: 'All Time', icon: 'Clock' }
  ];

  return (
    <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
      {filters?.map((filter) => (
        <button
          key={filter?.id}
          onClick={() => onFilterChange(filter?.id)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
            activeFilter === filter?.id
              ? 'bg-card text-foreground shadow-elevation-1'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={filter?.icon} size={16} />
          <span className="hidden sm:inline">{filter?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;