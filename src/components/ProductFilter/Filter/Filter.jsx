import React from 'react';
import FilterItem from '../FilterItem/FilterItem';



const Filter = ({ filters, onFilterChange }) => {
    return (

        <div className="filter-container">
            <h1>Termékszűrő</h1>
            {filters.map((filter, index) => (
                <FilterItem
                    key={index}
                    filterCategory={filter.filterCategory}
                    title={filter.title}
                    options={filter.options}
                    onFilterChange={onFilterChange}
                />
            ))}
        </div>

    );
};

export default Filter;
