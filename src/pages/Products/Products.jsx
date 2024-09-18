import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';
import { Spinner } from '../../components/Spinner/Spinner'
import Card from '../../components/ProductCard/ProductCard'
import { CartContext } from '../../contexts/CartContext';
import Filter from '../../components/ProductFilter//Filter/Filter'
import { modelData, colorData, brandData, categoryMap, categoryTitle } from '../../assets//assets'

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isPending, setPending] = useState(false);
  const { category } = useParams();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [resetFiltersTrigger, setResetFiltersTrigger] = useState(0);
  const [isOpen, setIsOpen] = useState(false);


  const apiCategory = categoryMap[category] || '';
  const title = categoryTitle[category] || '';


  // Nullázza a checkboxok állapotát, amikor a kategória változik
  useEffect(() => {
    setSelectedFilters([]);
    setResetFiltersTrigger(prev => prev + 1); // Trigger érték növelése
  }, [category]);


  // Api hívás
  function fetchProduct() {
    return fetch('https://thomasapi.eu/api/products', {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      mode: "cors"
    })
      .then(res => res.json())
      .then(setProducts);
  }

  // a spinner megjelenítése és eltüntetése
  useEffect(() => {
    setPending(true);
    fetchProduct().finally(() => {
      setPending(false);
    });
  }, []);




  useEffect(() => {
    // Alap szűrés az akciók vagy alkategória alapján a navbar gombjaira kattintva
    let filtered = category === 'akciók'
      ? products.filter(product => product.OnSale === true)
      : products.filter(product => product.SubCategoryName.toLowerCase() === apiCategory.toLowerCase());

    // Szűrés a kiválasztott szűrők alapján a checkbox változásai alapján
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters.some(filter =>
          product[filter.filterCategory] &&
          product[filter.filterCategory].toLowerCase() === (filter.value.toLowerCase())
        )
      );
    }

    // Ár szerinti rendezés

    if (sortOrder === "default") {
      filtered = [...filtered]
    } else if (sortOrder === 'ascending') {
      filtered = filtered.sort((a, b) => a.Price - b.Price);
    } else if (sortOrder === 'descending') {
      filtered = filtered.sort((a, b) => b.Price - a.Price);
    } else if (sortOrder === 'abc') {
      filtered = filtered.sort();
    } else if (sortOrder === 'cba') {
      filtered = filtered.reverse();
    }


    setFilteredProducts(filtered);
  }, [products, selectedFilters, category, apiCategory, sortOrder]);





  // A fixen tárolt adatok alapján attől függően hogy melyik subkategóriánál vagyunk
  // mindig az ott elérhető , márka, szín és model fajta jelenik meg.
  useEffect(() => {
    const generateFilters = () => {
      const colorOptions = (colorData[apiCategory] || []).map(color => ({ label: color, value: color }));
      const brandOptions = (brandData[apiCategory] || []).map(brand => ({ label: brand, value: brand }));
      const modelOptions = (modelData[apiCategory] || []).map(model => ({ label: model, value: model }));

      return [
        {
          title: 'Márkák',
          filterCategory: 'BrandName',
          options: brandOptions,
        },
        {
          title: 'Színek',
          filterCategory: 'Color',
          options: colorOptions,
        },
        {
          title: 'Modellek',
          filterCategory: 'Model',
          options: modelOptions,
        },
      ];
    };

    const newFilters = generateFilters();
    setFilters(newFilters); // setFilters hookban definiálva
  }, [category]);









  // A chacbox váltazásánál lefutó funkció ami elmenti az összes szelektált paraétert
  const handleFilterChange = (checked, filterCategory, value) => {
    if (checked) {
      setSelectedFilters(prev => [...prev, { filterCategory, value }]);
    } else {
      setSelectedFilters(prev => prev.filter(filter => !(filter.filterCategory === filterCategory && filter.value === value)));
    }
    setIsOpen(false);
  };

  // Checkbox változásainál kapott adatok
  const onFilterChange = (checked, filterCategory, value) => {
    handleFilterChange(checked, filterCategory, value);
  
  };


  // Ár szűrése csökkennő vagy növekvő sorrendben
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };


  const handleSortDisplay = () => {
    setIsOpen(!isOpen);
  }


  return (
    <div className='products'>
      <h2 className='title'>{title}</h2>
      <section className="product-container w1400">

        <Filter className="filter-container" isOpen={isOpen} handleSortDisplay={handleSortDisplay}  filters={filters} onFilterChange={onFilterChange} resetFiltersTrigger={resetFiltersTrigger} />

        <div className="product-container-wrapper">

          <div className="sort-container">
            <button className='btn sort-btn' onClick={handleSortDisplay}>Szűrés</button>
            <div className="select-container">
              <label>Rendezés: </label>
              <select value={sortOrder} onChange={handleSortChange}>
                <option value="default">Alapértelmezett</option>
                <option value="ascending">Ár (alacsony &gt; magas)</option>
                <option value="descending">Ár (magas &gt; alacsony)</option>
                <option value="abc">Név (A - Z)</option>
                <option value="cba">Név (Z - A)</option>
              </select>
            </div>
          </div>


          <div className="product-card-container">
            {(isPending) ? <Spinner /> : filteredProducts.slice(0, 24).map(product => (
              // Termék kártyák 
              // TODO egy oldalon 24 tewrméket jelenítünk meg. a lapozást még meg kell oldani!!
              <Card
                key={product.ProductID}
                product={product}
                onAddToCart={() => addToCart(product,1)}
              />
            ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products;