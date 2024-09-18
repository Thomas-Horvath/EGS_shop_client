import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import './ProductDetail.css';

const ProductDetails = () => {
    const { id } = useParams(); // Lekéri az URL-ből a termék azonosítóját
    const [product, setProduct] = useState(null); // Állapot a termék adatok tárolására
    const [isLoading, setIsLoading] = useState(true); // Betöltési állapot kezelése
    const [error, setError] = useState(null); // Hibakezelés
    const { addToCart  } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate(); // Navigáció

    useEffect(() => {
        // Fetch hívás a termék adatok lekérésére
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://thomasapi.eu/api/product/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                    mode: "cors",
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]); // Az effect újra fut, ha a productID változik



    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            //   alert('Termék hozzáadva a kosárhoz!'); // Visszajelzés a felhasználónak
        }
    };

  

    const handleGoBack = () => {
        navigate(-1); // Visszaugrik az előző oldalra
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity < 20) {
                return prevQuantity + 1;
            }
            return prevQuantity;
        });
    };
    
    const decrementQuantity = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity > 1) {
                return prevQuantity - 1;
            }
            return prevQuantity;
        });
    };
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
    
        if (value >= 1 && value <= 20) {
            setQuantity(value);
        } else if (value < 1) {
            setQuantity(1);
        } else if (value > 20) {
            setQuantity(20);
        }
    };
    

    if (isLoading) return <div className='detail-container'>Loading...</div>;
    if (error) return <div className='detail-container'>Error: {error}</div>;

    return (
        <div className='detail-container'>
            <h1 className='main-title'>{product.BrandName} - {product.Name}</h1>
            {product ? (

                <div className='product-details'>
                    <div className='product-image'>
                        <img src={product.ProductPhotoURL} alt={product.Name} />
                    </div>
                    <div className='product-info'>
                        {product.Model && <p><strong>Modell:</strong> {product.Model}</p>}
                        {product.Color && <p><strong>Szín:</strong> {product.Color}</p>}
                        {product.Quality && <p><strong>Minőség:</strong>{product.Quality === "P" ? "Prémium" : "Standard"}</p>}
                        {product.BundsNumber && <p><strong>Bundok száma:</strong> {product.BundsNumber}</p>}
                        {product.Body && <p><strong>Korpusz:</strong> {product.Body}</p>}
                        {product.Neck && <p><strong>Nyak:</strong> {product.Neck}</p>}
                        {product.FretBoard && <p><strong>Fretboard:</strong> {product.FretBoard}</p>}
                        {product.Pickup && <p><strong>Pickup:</strong> {product.Pickup}</p>}
                        {product.Weight > 0 && <p><strong>Súly:</strong> {product.Weight} kg</p>}
                        {product.ChannelsNumber > 0 && <p><strong>Csatornák száma:</strong> {product.ChannelsNumber}</p>}
                        {product.SpeakersNumber > 0 && <p><strong>Hangszórók száma:</strong> {product.SpeakersNumber}</p>}
                        {product.Wattage > 0 && <p><strong>Teljesítmény:</strong> {product.Wattage} W</p>}
                        {product.Width > 0 && <p><strong>Szélesség:</strong> {product.Width} cm</p>}
                        {product.Length > 0 && <p><strong>Hosszúság:</strong> {product.Length} cm</p>}
                        {product.Thickness > 0 && <p><strong>Vastagság:</strong> {product.Thickness} cm</p>}
                        {product.CableLength > 0 && <p><strong>Kábel hossz:</strong> {product.CableLength} m</p>}
                        {product.ConnectorType && <p><strong>Csatlakozó típus:</strong> {product.ConnectorType}</p>}
                        {product.Radius && <p><strong>Rádiusz:</strong> {product.Radius}</p>}
                        <p><strong>Kategória:</strong> {product.CategoryName}</p>
                        <p><strong>Alkategória:</strong> {product.SubCategoryName}</p>
                        <p><strong>Márka:</strong> {product.BrandName}</p>
                        {product.SalePrice > 0 ? <p><strong>Akciós ár:</strong>
                            <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>{product.Price} FT</span>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{product.SalePrice} FT</span></p>
                            : <p><strong>Ár:</strong> <span>{product.Price} Ft</span></p>}
                        {product.Description && <div><p><strong>Leírás:</strong></p> <p>{product.Description}</p></div>}
                    </div>
                </div>

            ) : (
                <div>No product found</div>
            )}
            <div className='product-buttons'>
                <div className="addtocart-groupe">
                    <div className="quantity-container">
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            min="1"
                            max="20"
                            onChange={handleQuantityChange}
                        />
                        <div className="quantity-btn-groupe">
                            <button onClick={incrementQuantity} className="quantity-btn red-btn">+</button>
                            <button onClick={decrementQuantity} className="quantity-btn red-btn">-</button>
                        </div>
                    </div>
                    <button className='btn product-details-btn red-btn' onClick={handleAddToCart}>Kosárba</button>
                </div>
                <button className='btn product-details-btn red-btn' onClick={handleGoBack}>Vissza</button>
            </div>


        </div>

    );
};

export default ProductDetails;
