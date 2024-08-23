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
            { label: 'Jobb kezes', path: '/termékek/jobb-kezes' },
            { label: 'Bal kezes', path: '/termékek/bal-kezes' },
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
]