import React from 'react';
import './FilterItem.css';

const FilterItem = ({ filterCategory, title, options, selectedCheckboxes, onFilterChange }) => {
  const handleChange = (e) => {
    const isChecked = e.target.checked;
    onFilterChange(filterCategory, e.target.value, isChecked);
    
  };

  return (
    <div className="filter-item">
      <h4>{title}</h4>
      {options.map((option, index) => (
        <div key={index} className="checkbox">
          <label className='checkbox-label' htmlFor={option.value}>{option.label}</label>
          <input
            type="checkbox"
            name={filterCategory}
            id={option.value}
            value={option.value}
            checked={selectedCheckboxes[`${filterCategory}-${option.value}`] || false}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterItem;
