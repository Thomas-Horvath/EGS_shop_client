import React from 'react';
import './InfoBlock.css';
import { FaTruckFast } from "react-icons/fa6";
import { FaGuitar } from "react-icons/fa";
import { PiSealPercentFill } from "react-icons/pi";
import { HiMiniChatBubbleLeftEllipsis } from "react-icons/hi2";

const InfoBlock = () => {
    return (
        <div>
            <div className="info-block ">
                <div className="info-cards-container w1400">
                    <div className="info-card">
                        <FaTruckFast />
                        <div className="info-content">
                            <h3>Házhoz szállítás</h3>
                            <p>Gyors házhoz szállítás országos akár 1-3 nap alatt!</p>
                            <span>25.000 Ft felett ingyenes a szállítás!</span>
                        </div>
                    </div>
                    <div className="info-card">
                        <HiMiniChatBubbleLeftEllipsis />
                        <div className="info-content">
                            <h3>Rugalmas ügyintézés</h3>
                            <p>14 napos visszavásárlás, rugalmas garanciális ügyintézés.</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <PiSealPercentFill />
                        <div className="info-content">
                            <h3>Tanáscsadás</h3>
                            <p>Több mint 25 év tapasztalatával nyújtunk kiemelkedő szakértői tanácsadást és szolgáltatásokat.</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <FaGuitar />
                        <div className="info-content">
                            <h3>Ingyenes hangszerbeállítás</h3>
                            <p>Ingyenes hangszerbeállítás minden vásárlónk számára!</p>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    )
}

export default InfoBlock