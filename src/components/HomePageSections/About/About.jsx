import React from 'react';
import './About.css';
import { assets } from '../../../assets/assets';

const About = () => {
    return (
        <div>
            <div className="about w1400">
                <h2 className='home-sections-heading'>Rólunk</h2>
                <div className="content-wrapper">
                    <p>
                        Üdvözlünk az Electric Guitar Shop világában, ahol a gitározás iránti szenvedélyünk minden hangszerben és szolgáltatásban tükröződik! Az Electric Guitar Shop története 1990-ben kezdődött, amikor alapítónk, Péter, megnyitotta első boltját Budapest belvárosában. Egy kis üzlethelyiségben, ahol a gitárosok közössége hamar otthonra talált, az üzlet gyorsan a város egyik legismertebb és legkedveltebb helyévé vált.
                    </p>
                    <p>
                        Péter maga is lelkes gitáros volt, és saját tapasztalataiból tudta, mennyire fontos egy minőségi hangszer a zenei élményben. Ez inspirálta őt arra, hogy megnyissa boltját, amelyben nem csupán eladni akarta a gitárokat, hanem lehetőséget is biztosítani a zenészeknek, hogy kipróbálhassák, tanuljanak és inspirációt meríthessenek egymástól. Kezdetben főleg elektromos gitárokra és erősítőkre specializálódtak, de az évek során a kínálat folyamatosan bővült mindenféle gitár és gitárkiegészítő irányába.
                    </p>
                    <p>
                        Az Electric Guitar Shop azóta is családi vállalkozásként működik, ahol minden munkatársunk elkötelezett a szakértelem és a kiemelkedő ügyfélszolgálat mellett. Számunkra fontos, hogy ne csak termékeket adjunk el, hanem támogassuk is a vásárlóinkat zenei útjuk során. Az Electric Guitar Shop-ban egy olyan közösség jött létre, ahol a gitárosok megoszthatják egymással tapasztalataikat, tanulhatnak egymástól, és együtt élvezhetik a zenét.
                    </p>
                    <p>
                        Az elmúlt évek során sok tehetséges gitáros kezdte nálunk a pályáját, és mi büszkék vagyunk arra, hogy részesei lehettünk zenei fejlődésüknek azzal, hogy elérhetővé tettük számukra a legjobb gitárokat és felszereléseket. Üzletünk mára nemcsak Magyarországon, hanem nemzetközileg is elismert hely lett a gitárosok körében.
                    </p>
                    <p>
                        Az online áruházunknak köszönhetően már bárhonnan megrendelheted kedvenc gitárodat és kiegészítőidet. Legyen szó Fender, Gibson, Ibanez vagy bármilyen más gitárról, az Electric Guitar Shopban biztosan megtalálod a számodra megfelelő hangszert. Célunk, hogy minden vásárlónk elégedetten távozzon, és visszatérjen hozzánk, amikor újabb inspirációra van szüksége.
                    </p>
                    <p>
                        Látogass el hozzánk személyesen is, és tapasztald meg, miért választják gitárosok százai az Electric Guitar Shop-ot! Legyen szó kezdő vagy profi zenészről, nálunk mindig találsz valami különlegeset, ami segít kibontakoztatni zenei tehetségedet.
                    </p>
                </div>
                <div className="shop-img">
                    <img src={assets.shop} alt="A bolt" />
                </div>
            </div>
        </div>
    )
}

export default About;
