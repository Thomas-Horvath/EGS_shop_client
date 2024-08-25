import banner from './banner.webp';
import marshall from './marshall.webp';
import logo from './logo.svg';
import percenticon from './percenticon.svg';
import basketIcon from './basket_icon.png';
import searchIcon from './search_icon.png';
import technic from './technic.jpg';

export const assets = {
    banner,
    marshall,
    logo,
    percenticon,
    basketIcon,
    searchIcon,
    technic
};


// navbar menu items
export const menuItems = [
    {
        title: 'Elektromos gitárok',
        submenuItems: [
            { label: 'Jobb kezes', path: '/termékek/jobbkezes' },
            { label: 'Bal kezes', path: '/termékek/balkezes' },
            { label: 'Héthúros', path: '/termékek/héthúros' },
        ],
    },
    {
        title: 'Gitár erősítők',
        submenuItems: [
            { label: 'Erősítő fej', path: '/termékek/erősítő-fejek' },
            { label: 'Láda', path: '/termékek/gitárládák' },
            { label: 'Kombó', path: '/termékek/kombók' },
        ],
    },
    {
        title: 'Effektek',
        submenuItems: [
            { label: 'Pedál', path: '/termékek/pedálok' },
            { label: 'Multieffekt', path: '/termékek/multieffektek' },
        ],
    },
    {
        title: 'Kiegészítők',
        submenuItems: [
            { label: 'Húr', path: '/termékek/húrok' },
            { label: 'Kemény tok', path: '/termékek/kemény-tokok' },
            { label: 'Puhatok', path: '/termékek/puhatokok' },
            { label: 'Heveder', path: '/termékek/hevederek' },
            { label: 'Pengető', path: '/termékek/pengetők' },
            { label: 'Kábelek', path: '/termékek/kábelek' },
        ],
    },
];


//  info links contents
export const preHeaderLinks = [
    {
        title: 'Kezdőlap',
        className: 'pre-menu-link',
        path: '/'
    },
    {
        title: 'Információk',
        className: 'pre-menu-link',
        path: '/információk'
    },
    {
        title: 'Szállítás és Fizetés',
        className: 'pre-menu-link',
        path: '/szállítás-és-fizetés'
    },
    {
        title: 'Kapcsolat',
        className: 'pre-menu-link',
        path: '/kapcsolat'
    },
];

//  footer info links contents
export const footerInfoLinks = [
    {
        title: 'Kezdőlap',
        className: 'footer-info-link',
        path: '/'
    },
    {
        title: 'Információk',
        className: 'footer-info-link',
        path: '/információk'
    },
    {
        title: 'Szállítás és Fizetés',
        className: 'footer-info-link',
        path: '/szállítás-és-fizetés'
    },
    {
        title: 'ASZF',
        className: 'footer-info-link',
        path: '/álltalános-szerződési-feltételek'
    },
    {
        title: 'Adatvédelem',
        className: 'footer-info-link',
        path: '/adatvédelem'
    },
    {
        title: 'Kapcsolat',
        className: 'footer-info-link',
        path: '/kapcsolat'
    },
];



// product oldal adatai
export const categoryMap = {
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


export const categoryTitle = {
    'balkezes': 'Balkezes gitárok',
    'jobbkezes': 'Jobbkezes gitárok',
    'héthúros': 'Héthúros gitárok',
    'erősítő-fejek': 'Gitáresősítő fejek',
    'kábelek': 'Gitár kábelek',
    'pedálok': 'Effekt pedálok',
    'multieffektek': 'Multieffekt pedálok',
    'pengetők': 'Pengetők',
    'gitárládák': 'Gitár ládák',
    'puhatokok': 'Puha tokok',
    'kombók': ' Gitár kombók',
    'hevederek': ' Hevederek',
    'húrok': 'Gitárhúrók',
    'kemény-tokok': ' Kemény tokok',
    'akciók': 'Akciós termékeink',
};

export const colorData = {
    'Jobbkezes': ["Piros", "Fekete", "Fehér", "Zöld", "Lila", "Szürke", "Sunburst", "Kék", "Natúr Fa", "Narancssárga", "Barna", "Natúr fa", "Feket", "Sárga", "Rózsaszín"],
    'Balkezes': ["Fekete", "Sunburst", "Narancssárga", "Kék", "Fehér", "Natúr Fa"],
    'Héthúros': ["Fekete", "Piros", "Zöld", "Barna"],
    'Fej': ["Fekete", "Piros", "Fehér"],
    'Gitár kábel': ["Fekete", "Barna", "Feket", "Kék", "Zöld", "Piros", "Sárga", "Rózsaszín", "Narancssárga", "Lila"],
    'Pedál': ["Narancssárga", "Kék", "Sárga", "Fekete", "Szürke", "Zöld", "Fehér", "Lila", "Barna"],
    'Láda': ["Fekete", "Narancssárga"],
    'Puha tok': ["Fekete", "Barna", "Zöld", "Kék"],
    'Combó': ["Narancssárga", "Fekete"],
    'Heveder': ["Fehér", "Fekete", "Sárga", "Lila", "Bordó", "Szürke", "Zöld", "Szivárvány", "Barna", "Kék", "Piros", "Mintás", "Rózsaszín", "Natúr "],
    'Húr': [""],
    'Kemény tok': ["Fekete"],
    'Mulltieffekt': ["Fekete"],
    'Pengető': ["Zöld", "Sárga", "Kék", "Lila", "Fekete", "Fehér", "Barna", "Szürke", "Feket", "Piros", "Narancssárga", "Piros "],
    'akciók': ["Piros", "Fekete", "Fehér", "Zöld", "Lila", "Szürke", "Sunburst", "Kék", "Natúr Fa", "Narancssárga", "Barna", "Sárga", "Rózsaszín", "Bordó", "Szivárvány", "Mintás"] // Az 'akciók' kulcsot meghagytam az eredeti struktúrában, ahogy kérted
};



export const brandData = {
    'Jobbkezes': ["Cort", "Fender", "Gibson", "Ibanez", "Epiphone", "Squier", "Jackson"],
    'Balkezes': ["Cort", "Fender", "Ibanez", "Squier", "Jackson"],
    'Héthúros': ["Cort", "Ibanez", "Jackson"],
    'Fej': ["Marshall", "ENGL", "Orange", "Laney"],
    'Gitár kábel': ["Fender", "Ernie Ball"],
    'Pedál': ["Boss", "Fender", "Ibanez", "Dunlop", "Line6"],
    'Láda': ["Marshall", "Laney", "Orange", "ENGL"],
    'Puha tok': ["Cort", "Fender", "Ibanez"],
    'Combó': ["Orange", "Laney", "MesaBoogei", "Line6"],
    'Heveder': ["Ernie Ball", "Fender", "Jackson", "Ibanez"],
    'Húr': ["Elixir", "D'Addario", "Ernie Ball"],
    'Kemény tok': ["Ibanez", "Fender", "Jackson", "Cort"],
    'Mulltieffekt': ["Boss", "Line6"],
    'Pengető': ["Dunlop"],
    'akciók': [
        "Cort", "Fender", "Gibson", "Ibanez", "Epiphone", "Squier", "Jackson",
        "Marshall", "ENGL", "Orange", "Laney", "MesaBoogei", "Line6", "Boss",
        "Dunlop", "Ernie Ball", "Elixir", "D'Addario"
    ]
};


export const modelData = {
    'Jobbkezes': ["Stratocaster", "Superstrat", "Les Paul", "Telecaster", "Jaguár", "SG", "Flying V", "Explorer", "Mustang"],
    'Balkezes': ["Stratocaster", "Stratocaste", "Telecaster", "Jaguár", "Superstrat"],
    'Héthúros': ["Superstrat", "Iceman", "Stratocaster"],
    'Fej': ["Csöves", "Tranzisztoros"],
    'Gitár kábel': ["Patch", "Gitár kábel"],
    'Pedál': ["Distortion", "Overdrive", "Fuzz", "Delay", "Chorus", "Flanger", "Phaser", "Wah", "EQ", "Reverb"],
    'Láda': ["Döntött", "Egyenes"],
    'Puha tok': ["Textil"],
    'Combó': ["Tranzisztoros", "Csöves"],
    'Heveder': ["Textil", "Bőr", "Farmer"],
    'Húr': ["Acél"],
    'Kemény tok': ["Műanyag", "Fa"],
    'Mulltieffekt': ["Multieffekt"],
    'Pengető': ["Műanyag"],
    'akciók': [
        "Stratocaster", "Superstrat", "Les Paul", "Telecaster", "Jaguár", "SG",
        "Flying V", "Explorer", "Mustang", "Iceman", "Csöves", "Tranzisztoros",
        "Döntött", "Egyenes", "Distortion", "Overdrive", "Fuzz", "Delay",
        "Chorus", "Flanger", "Phaser", "Wah", "EQ", "Reverb", "Multieffekt",
        "Textil", "Bőr", "Farmer", "Acél", "Műanyag", "Fa", "Patch", "Gitár kábel"
    ]
};


