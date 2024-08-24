import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';
import { Spinner } from '../../components/Spinner/Spinner'
import Card from '../../components/ProductCard/ProductCard'
import { CartContext } from '../../contexts/CartContext';
import Filter from '../../components/ProductFilter//Filter/Filter'

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isPending, setPending] = useState(false);
  const { category } = useParams();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

 



  // szótár a termék alkategóriákhoz
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

  const apiCategory = categoryMap[category] || '';


  const categoryTitle = {
    'balkezes': 'Balkezes gitárok',
    'jobbkezes': 'Jobbkezes gitárok',
    'héthúros': 'Héthúros gitárok',
    'erősítő-fejek': 'Gitáresősítő fejek',
    'kábelek': 'Gitár kábelek',
    'pedálok': 'Effekt pedálok',
    'multieffektek': 'Multieffekt pedálok',
    'pengetők': 'Pnegetők',
    'gitárládák': 'Gitár ládák',
    'puhatokok': 'Puha tokok',
    'kombók': ' Gitár kombók',
    'hevederek': ' Hevederek',
    'húrok': 'Gitárhúrók',
    'kemény-tokok': ' Kemény tokok',
    'akciók': 'Akciós termékeink',
  };

  const title = categoryTitle[category] || '';


  const filters = [
    {
      title: 'Kategóriák',
      filterCategory: 'CategoryName',
      options: [
        { label: 'Gitár', value: 'Gitár' },
        { label: 'Erősítő', value: 'Erősítő' },
        { label: 'Effekt', value: 'Effekt' },
        { label: 'Kiegészítő', value: 'Kiegészítő' },
      ],
    },
    {
      title: 'Márkák',
      filterCategory: 'BrandName',
      options: [
        { label: "D'Addario", value: "D'Addario" },
        { label: 'Dunlop', value: 'Dunlop' },
        { label: 'Elixir', value: 'Elixir' },
        { label: 'Ernie Ball', value: 'Ernie Ball' },
        { label: 'Ibanez', value: 'Ibanez' },
        { label: 'Boss', value: 'Boss' },
        { label: 'ENGL', value: 'ENGL' },
        { label: 'Fender', value: 'Fender' },
        { label: 'Epiphone', value: 'Epiphone' },
        { label: 'Gibson', value: 'Gibson' },
        { label: 'Squeir', value: 'Squeir' },  //TODO Átíni  a helyes névre
        { label: 'Line6', value: 'Line6' },
        { label: 'MesaBoogei', value: 'MesaBoogei' }, //TODO Átíni  a helyes névre
        { label: 'Jackson', value: 'Jackson' },
        { label: 'Cort', value: 'Cort' },
        { label: 'Laney', value: 'Laney' },
        { label: 'Orange', value: 'Orange' },
        { label: 'Marshall', value: 'Marshall' },
      ],
    },
    {
      title: 'Szín',
      filterCategory: 'Color',
      options: [
        { label: 'Narancssárga', value: 'Narancssárga' },
        { label: 'Natúr', value: 'Natúr' },
        { label: 'Bordó', value: 'Bordó' },
        { label: 'Piros', value: 'Piros' },
        { label: 'Szivárvány', value: 'Szivárvány' },
        { label: 'Kék', value: 'Kék' },
        { label: 'Natúr Fa', value: 'Natúr Fa' },
        { label: 'Rózsaszín', value: 'Rózsaszín' },
        { label: 'Mintás', value: 'Mintás' },
        { label: 'Fekete', value: 'Fekete' },
        { label: 'Zöld', value: 'Zöld' },
        { label: 'Fehér', value: 'Fehér' },
        { label: 'Szürke', value: 'Szürke' },
        { label: 'Sunburst', value: 'Sunburst' },
        { label: 'Barna', value: 'Barna' },
        { label: 'Lila', value: 'Lila' },
      ],
    },
    // További szűrők
  ];
  



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


  useEffect(() => {
    setPending(true);
    fetchProduct().finally(() => {
      setPending(false);
    });
  }, [])


  useEffect(() => {
    // Alap szűrés az akciók vagy alkategória alapján
    let filtered = category === 'akciók'
      ? products.filter(product => product.OnSale === true)
      : products.filter(product => product.SubCategoryName.toLowerCase() === apiCategory.toLowerCase());
  
    // Szűrés a kiválasztott szűrők alapján
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters.some(filter =>
          product[filter.filterCategory] && 
          product[filter.filterCategory].toLowerCase().includes(filter.value.toLowerCase())
        )
      );
    }
  console.log(filtered)
    setFilteredProducts(filtered);
  }, [products, selectedFilters, category, apiCategory]);












  const handleFilterChange = (checked, filterCategory, value) => {
    if (checked) {
      setSelectedFilters(prev => [...prev, { filterCategory, value }]);
    } else {
      setSelectedFilters(prev => prev.filter(filter => !(filter.filterCategory === filterCategory && filter.value === value)));
    }
  };





  const onFilterChange = (checked, filterCategory, value) => {
    handleFilterChange(checked, filterCategory, value)
    console.log(checked, filterCategory, value)
  }




  return (
    <div className='products'>
      <h2 className='title'>{title}</h2>
      <section className="product-container w1400">
        <Filter className="filter-container" filters={filters} onFilterChange={onFilterChange} />



        <div className="product-card-container">
          {(isPending) ? <Spinner /> :

            filteredProducts.map(product => (
              // Termék kártyák 
              <Card
                key={product.ProductID}
                title={product.Name}
                imgPath={product.ProductPhotoURL}
                price={product.Price}
                SalePrice={product.SalePrice}
                onAddToCart={() => addToCart(product)}
              />
            ))
          }
        </div>

      </section>
    </div>
  )
}

export default Products;