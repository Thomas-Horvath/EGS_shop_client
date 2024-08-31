import React from 'react';
import './Brands.css';
import {assets} from '../../../assets/assets'

const Brands = () => {
    return (
        <div>
            <div className="brands w1400">
                <h2 className='home-sections-heading'>Forgalmazott márkáink</h2>
                <div className="brand-cards-container">
                    <div className="brand-card">
                        <img src={assets.fender} alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                    <div className="brand-card">
                        <img src="" alt="Fender" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Brands