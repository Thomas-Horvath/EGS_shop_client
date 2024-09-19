import React from 'react';
import { useLocation } from 'react-router-dom';
import './Info.css';

const Info = () => {
  const location = useLocation();
  const path = location.pathname;
  const decodedCategory = decodeURIComponent(path);
  let content;

  switch (decodedCategory) {
    case '/általános-szerződési-feltételek':
      content = (
        <div>
          <h1>Általános Szerződési Feltételek</h1>
          <p>Üdvözöljük webáruházunkban! Az alábbiakban olvashatja az általános szerződési feltételeinket, amelyek a webáruházunk használatára vonatkoznak.</p>
          <h2>1. Általános Információk</h2>
          <p>Webáruházunk célja, hogy széles választékot kínáljon hangszerekből és zenei kiegészítőkből. Az itt található információk és termékek csak tájékoztató jellegűek, és a változtatás jogát fenntartjuk.</p>
          <p>Az áruházunk folyamatosan frissíti a termékek listáját és az árakat. Javasoljuk, hogy rendszeresen ellenőrizze a legfrissebb információkat.</p>
          <h2>2. Vásárlás és Fizetés</h2>
          <p>A vásárlás során az Ön által megadott adatok alapján teljesítjük a rendelést. A termékek ára a rendelés leadásakor érvényes. Az árak az ÁFA-t tartalmazzák.</p>
          <p>A vásárlás során köteles a helyes adatokat megadni. A hamis információk esetén nem vállalunk felelősséget a megrendelés késedelmes teljesítéséért vagy az esetleges problémákért.</p>
          <h2>3. Jogi Nyilatkozat</h2>
          <p>Webáruházunk nem vállal felelősséget az oldalunkon található információk pontosságáért, illetve az esetleges hibákért. Az oldal használatával elfogadja, hogy a webáruházunk nem felelős a közvetett, közvetlen, véletlen vagy következményes károkért.</p>
          <p>A webáruházunk nem vállal felelősséget az oldalon található harmadik fél által nyújtott tartalmakért és szolgáltatásokért. Az ilyen tartalmakért a harmadik felek teljes mértékben felelősek.</p>
        </div>
      );
      break;
    case '/információk':
      content = (
        <div>
        <h1>Információk</h1>
        <p>Üdvözöljük az Electric Guitar Shop webáruházban! Célunk, hogy a legjobb vásárlási élményt biztosítsuk Önnek. Az alábbiakban tájékozódhat a boltunkkal, termékeinkkel és szolgáltatásainkkal kapcsolatos legfontosabb információkról.</p>
      
        <h2>Miért válassza az Electric Guitar Shop-ot?</h2>
        <p>Az Electric Guitar Shop több mint 25 éves tapasztalattal rendelkezik a hangszer- és hangtechnikai termékek piacán. Néhány ok, amiért érdemes minket választani:</p>
        <ul>
          <li>Széleskörű tapasztalat és szakértelem a hangszerek világában.</li>
          <li>Kiemelt partnerek vagyunk a legnagyobb gyártókkal, így gyors és megbízható szolgáltatást nyújtunk.</li>
          <li>Magyar garancia a termékeinkre, amely biztosítja a vásárlás utáni támogatást.</li>
          <li>Szakértő csapatunk segít Önnek a legjobb választásban és támogatást nyújt a termékek használatában.</li>
          <li>Folytatunk folyamatos innovációt és fejlesztést, hogy mindig a legújabb és legjobb termékeket kínáljuk.</li>
        </ul>
      
        <h2>Árukereső és vásárlási tudnivalók</h2>
        <p>Webáruházunkban könnyen megtalálhatja az Ön számára ideális termékeket. Itt van néhány fontos tudnivaló:</p>
        <ul>
          <li><strong>Árak és aktuális állapot:</strong> Az árakat folyamatosan frissítjük, hogy mindig naprakész információt kapjon.</li>
          <li><strong>Személyes átvétel:</strong> Ha Ön a közelben tartózkodik, lehetősége van személyesen is átvenni rendelését boltunkban.</li>
          <li><strong>Rendelési lehetőségek:</strong> Webáruházunkban egyszerűen leadhatja rendelését online.</li>
          <li><strong>Szállítási költség:</strong> A szállítási költség a rendelés súlyától és a szállítási címtől függően változhat.</li>
          <li><strong>Szállítás módja:</strong> A termékek házhoz szállítása futárszolgálattal történik.</li>
          <li><strong>Fizetési módok:</strong> Többféle fizetési lehetőséget kínálunk, beleértve banki átutalást, készpénzes és kártyás fizetést.</li>
          <li><strong>Garancia:</strong> Termékeinkre garanciát vállalunk, amely biztosítja a vásárlás utáni támogatást.</li>
          <li><strong>Használt termékek:</strong> Ha használt terméket keres, nézze meg a kínálatunkat, ahol minőségi használt hangszereket találhat.</li>
          <li><strong>Rendelés feldolgozása:</strong> Rendelését gyorsan és hatékonyan feldolgozzuk, és értesítjük a szállítás állapotáról.</li>
          <li><strong>Hitelre vásárlás:</strong> Bizonyos termékeinket hitelre is vásárolhatja.</li>
          <li><strong>Elállás joga:</strong> Jogában áll 14 napon belül elállni a vásárlástól, amennyiben az áru nem felel meg az elvárásainak.</li>
        </ul>
      
        <h2>Kapcsolat</h2>
        <p>Ha bármilyen kérdése van, vagy segítségre van szüksége, kérjük, lépjen kapcsolatba ügyfélszolgálatunkkal. Elérhetőségeink:</p>
        <ul>
          <li><strong>Email:</strong> <a href="/">info@egs.hu</a></li>
          <li><strong>Telefon:</strong> [Telefonszám]</li>
          <li><strong>Ügyfélszolgálat:</strong> hétfőtől péntekig 9:00 és 17:00 között</li>
        </ul>
      
        <h2>Nyitvatartás</h2>
        <p>Webáruházunk 24/7 elérhető. Ügyfélszolgálatunk hétfőtől péntekig, 10:00-18:00 között érhető el telefonon és emailen keresztül.</p>
        <p>Ha bármilyen problémája van a rendelésével vagy kérdése van a termékekkel kapcsolatban, ne habozzon kapcsolatba lépni velünk.</p>
      
        <h2>Impresszum</h2>
        <p><strong>Cégnév:</strong> Electric Guitar Shop</p>
        <p><strong>Cím:</strong>  1035 Budapest Bárhol utca 6. </p>
        <p><strong>Adószám:</strong> 3-897-8654-85</p>
        <p><strong>Kapcsolattartó személy:</strong> Horváth Tamás, üi.</p>
        <p><strong>Email:</strong> <a href="/">info@egs.hu</a></p>
        <p><strong>Telefonszám:</strong> 06 20 123 4567</p>
      </div>
      
      );
      break;
    case '/szállítás-és-fizetés':
      content = (
        <div>
        <h1>Szállítás és Fizetés</h1>
        
        <h2>Szállítás</h2>
        <p>Webáruházunk jelenleg csak futárszolgálatot kínál a rendelései házhoz szállítására. A megrendeléseket a rendelést követően 3-5 munkanapon belül kézbesítjük.</p>
        <p>A szállítási díjak a rendelés értékétől függően változnak:</p>
        <ul>
            <li>25 000 Ft alatt: 2500 Ft</li>
            <li>25 000 Ft-tól: díjtalan</li>
        </ul>
        <p>A csomagokat futárszolgálat szállítja ki az Ön által megadott címre. Kérjük, hogy a csomagot a kézbesítés során a futár előtt ellenőrizze. Amennyiben sérülést tapasztal a termékeken, kérjük, jegyzőkönyvet vegyen fel, és ne vegye át a csomagot!</p>
        <p>Utólagos reklamációt jegyzőkönyv nélküli sérülés esetén nem áll módunkban elfogadni.</p>
    
        <h2>Fizetés</h2>
        <p>A rendelés ellenértékét az alábbi módokon tudja rendezni:</p>
        <ul>
            <li>Online bankkártyás fizetés</li>
            <li>Átutalás</li>
            <li>Utánvétes fizetés (a futárnál készpénzes vagy bankkártyás)</li>
        </ul>
        <p>Átutalás esetén kérjük, a megrendelés számát tüntesse fel a közlemény rovatban. Online bankkártyás fizetés esetén azonnali visszaigazolást kap a tranzakcióról.</p>
    </div>
    
      );
      break;
    case '/adatvédelem':
      content = (
        <div>
          <h1>Adatvédelem</h1>
          <p>Az adatvédelem fontos számunkra. Az alábbiakban tájékozódhat arról, hogyan kezeljük az Ön személyes adatait.</p>
          <h2>1. Személyes Adatok Gyűjtése</h2>
          <p>Webáruházunk a vásárlás során megadott személyes adatokat gyűjti és tárolja. Ezeket az adatokat csak a rendelés teljesítése és a kapcsolattartás érdekében használjuk.</p>
          <p>Az Ön személyes adatai bizalmasak, és harmadik fél számára nem kerülnek átadásra, kivéve, ha az szükséges a rendelés teljesítéséhez.</p>
          <h2>2. Adatvédelmi Jogok</h2>
          <p>Ön jogosult hozzáférni a nálunk tárolt adataihoz, kérheti azok módosítását vagy törlését. Az adatvédelmi jogairól további információt az adatvédelmi nyilatkozatunkban talál.</p>
          <p>Ha bármilyen kérdése van az adatvédelmi szabályzatunkkal kapcsolatban, kérjük, lépjen kapcsolatba velünk az adatvedelem@hangszerbolt.hu email címen.</p>
          <h2>3. Kapcsolat</h2>
          <p>Ha bármilyen kérdése van az adatvédelmi szabályzatunkkal kapcsolatban, kérjük, lépjen kapcsolatba velünk az adatvedelem@hangszerbolt.hu email címen. Munkatársaink szívesen válaszolnak minden felmerülő kérdésre.</p>
        </div>
      );
      break;
    default:
      content = <div>Az oldal nem található.</div>;
  }

  return (
    <div className='info w1400'>
      {content}
    </div>
  );
};

export default Info;
