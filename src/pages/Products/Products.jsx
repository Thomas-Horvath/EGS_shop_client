import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';
import { Spinner } from '../../components/Spinner/Spinner';
import Card from '../../components/ProductCard/ProductCard';
import { CartContext } from '../../contexts/CartContext';
import { PiFadersHorizontalBold } from "react-icons/pi";
import Filter from '../../components/ProductFilter//Filter/Filter';
import ReactPaginate from 'react-paginate';
import { modelData, colorData, brandData, categoryMap, categoryTitle } from '../../assets//assets';

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
  const [currentPage, setCurrentPage] = useState(0);
  const apiCategory = categoryMap[category] || '';
  const title = categoryTitle[category] || '';
  const productsPerPage = 24;
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);






  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  // Nullázza a checkboxok állapotát, amikor a kategória változik
  useEffect(() => {
    setSelectedFilters([]);
    setResetFiltersTrigger(prev => prev + 1); // Trigger érték növelése
  }, [category]);


  // Api hívás
  function fetchProduct() {
    return fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
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
    let filtered;
    // Alap szűrés az akciók vagy alkategória alapján a navbar gombjaira kattintva
    filtered = category === 'akciók'
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
    setCurrentPage(0);  // szűrésnél reseteljük a lapozót is!
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
      window.scrollTo(0, 0);
      setIsOpen(false);
    } else {
      setSelectedFilters(prev => prev.filter(filter => !(filter.filterCategory === filterCategory && filter.value === value)));
    }
    
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
        <Filter className="filter-container" isOpen={isOpen} handleSortDisplay={handleSortDisplay} filters={filters} onFilterChange={onFilterChange} resetFiltersTrigger={resetFiltersTrigger} />

        <div className="product-container-wrapper">

          <div className="sort-container">
            <button className='btn sort-btn' onClick={handleSortDisplay}><PiFadersHorizontalBold />Szűrés</button>
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

          {isPending ? <Spinner /> :
            filteredProducts.length === 0 ? <p className='no-product'>Nincs ilyen akciós termékünk!</p> :
              <div className="product-card-container">
                {currentProducts.map(product => (
                  <Card
                    key={product.ProductID}
                    product={product}
                    onAddToCart={() => addToCart(product, 1)}
                  />
                ))
                }
              </div>
          }
          <ReactPaginate
            previousLabel={'Előző'}
            nextLabel={'Következő'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={currentPage}
          />
        </div>
      </section>
    </div>
  )
}

export default Products;