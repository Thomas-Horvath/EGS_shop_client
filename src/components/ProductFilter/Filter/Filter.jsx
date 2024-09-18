import React, { useEffect, useState } from 'react';
import FilterItem from '../FilterItem/FilterItem';
import './Filter.css';
import { IoMdClose } from "react-icons/io";

const Filter = ({ filters, onFilterChange, resetFiltersTrigger, isOpen , handleSortDisplay }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  useEffect(() => {
    // Reseteljük a checkboxokat, amikor a resetFiltersTrigger változik
    setSelectedCheckboxes({});
  }, [resetFiltersTrigger]);

  const handleCheckboxChange = (filterCategory, value, isChecked) => {
    setSelectedCheckboxes(prev => ({
      ...prev,
      [`${filterCategory}-${value}`]: isChecked,
    }));

    onFilterChange(isChecked, filterCategory, value);
  };
  

  return (
    <div className={`filter-container ${isOpen ? 'open-sort-menu' : ''}`} >
      <IoMdClose className='close-icon' onClick={handleSortDisplay}/>
      <h1>Termékszűrő</h1>
      {filters.map((filter, index) => (
        <FilterItem
          key={index}
          filterCategory={filter.filterCategory}
          title={filter.title}
          options={filter.options}
          selectedCheckboxes={selectedCheckboxes}
          onFilterChange={handleCheckboxChange}
        />
      ))}
      
    </div>
  );
};

export default Filter;
