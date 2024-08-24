

const FilterItem = ({ filterCategory, title, options, onFilterChange }) => {

  const handleChange = (e) => {
    // Az esemény célpontja (e.target) tartalmazza az állapotot és a szűrő kategóriát
    onFilterChange(e.target.checked, filterCategory, e.target.value);
  };


  return (
    <div className="filter-item">
      <h4>{title}</h4>
      {options.map((option, index) => (
        <div key={index} className="checkbox">
          <input
            type="checkbox"
            name={filterCategory}
            id={option.value}
            value={option.value}
            onChange={handleChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>

      ))}
    </div>
  );
};

export default FilterItem;
