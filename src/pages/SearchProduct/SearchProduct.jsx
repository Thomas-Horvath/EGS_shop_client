import React, { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import Card from '../../components/ProductCard/ProductCard';
import { Spinner } from '../../components/Spinner/Spinner';
import { CartContext } from '../../contexts/CartContext';
import ReactPaginate from 'react-paginate';

const SearchProduct = () => {
    const { search } = useContext(SearchContext);
    const { addToCart } = useContext(CartContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isPending, setPending] = useState(true); // Kezdő állapot: true
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 24;
    const offset = currentPage * productsPerPage;
    const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

    async function fetchProduct() {
        try {
            const response = await fetch('https://thomasapi.eu/api/products', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                mode: "cors"
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Hiba a termékek betöltésekor:', error);
        } finally {
            setPending(false); // Töltés befejeződött, állapot frissítése
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        // Filter products based on search query
        if (search) {
            const results = products.filter(product =>
                product.Name.toLowerCase().includes(search.toLowerCase()) ||
                product.BrandName.toLowerCase().includes(search.toLowerCase()) ||
                product.SubCategoryName.toLowerCase().includes(search.toLowerCase()) ||  
                product.CategoryName.toLowerCase().includes(search.toLowerCase()) 
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products);
        }
        setCurrentPage(0); // Reset page number to 0 when search changes
    }, [search, products]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    };

   
    const content = isPending ? (
        <Spinner /> 
    ) : filteredProducts.length === 0 ? (
        <p className='no-product'>Nincs találat!</p>
    ) : (
        <div>
            <div className="product-card-container">
                {currentProducts.map(product => (
                    <Card
                        key={product.ProductID}
                        product={product}
                        onAddToCart={() => addToCart(product, 1)}
                    />
                ))}
            </div>
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
    );

    return (
        <div className='search-products w1400'>
            <h1>A keresett terméke:</h1>
            {content}
        </div>
    );
}

export default SearchProduct;
