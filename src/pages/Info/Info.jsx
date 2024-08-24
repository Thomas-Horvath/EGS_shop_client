import React, { useState, useEffect } from 'react';

// Az API adatai
const categoryMap = {
  'balkezes': 'Balkezes',
  'jobbkezes': 'Jobbkezes',
  'héthúros': 'Héthúros',
  'erősítő-fejek': 'Fej',
  'kábelek': 'Gitár kábel',
  'pedálok': 'Pedál',
  'multieffektek': 'Mulltieffekt',
  'pengetők': 'Pengető',
  'gitárládák': 'Láda',
  'puhatokok': 'Puha tok',
  'kombók': 'Combó',
  'hevederek': 'Heveder',
  'húrok': 'Húr',
  'kemény-tokok': 'Kemény tok',
  'akciók': 'akciók',
};

function App() {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('balkezes'); // Kiválasztott alkategória

  useEffect(() => {
    // API hívás
    fetch('https://thomasapi.eu/api/products', {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        updateFilteredData(data, selectedCategory);
      });
  }, [selectedCategory]); // Frissítse, amikor az alkategória változik

  function updateFilteredData(products, category) {
    // Szűrés az aktuális alkategória alapján
    const filteredProducts = products.filter(product =>
      product.SubCategoryName.toLowerCase() === category
    );

    // Csoportosítás az aktuális mezők szerint (BrandName, Color, Model)
    const groupedData = {
      BrandName: new Set(),
      Color: new Set(),
      Model: new Set()
    };

    filteredProducts.forEach(product => {
      groupedData.BrandName.add(product.BrandName || 'N/A');
      groupedData.Color.add(product.Color || 'N/A');
      groupedData.Model.add(product.Model || 'N/A');
    });

    // Átkonvertáljuk a Set-t listává
    const formattedGroupedData = {};
    Object.keys(groupedData).forEach(key => {
      formattedGroupedData[key] = Array.from(groupedData[key]);
    });

    setFilteredData(formattedGroupedData);
  }

  function handleCategoryChange(event) {
    // A kiválasztott kategória frissítése a value alapján
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  }

  return (
    <div>
      <h1>Alkategóriák és Kiválasztott Jellemzők</h1>

      {/* Kiválasztás alkategóriára */}
      <label htmlFor="category-select">Válassz ki egy alkategóriát:</label>
      <select id="category-select" onChange={handleCategoryChange} value={selectedCategory}>
        {Object.keys(categoryMap).map(categoryKey => (
          <option key={categoryKey} value={categoryKey}>
            {categoryMap[categoryKey]}
          </option>
        ))}
      </select>

      {/* Szűrt adatok megjelenítése */}
      <div>
        {Object.keys(filteredData).map(field => (
          <div key={field}>
            <h2>{field}</h2>
            <ul>
              {filteredData[field].map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
