import linear from './assets/Linear.png'
import ovate from './assets/Ovate.png'
import elliptical from './assets/Elliptical.png'
import oblong from './assets/Oblong.png'
import Cordate from './assets/Cordate.png'
import Lanceolate from './assets/Lanceolate.png'
import Acicular from './assets/Acicular.png'
import Reniform from './assets/Reniform.png'
import Orbicular from './assets/Orbicular.png'
import Sagittate from './assets/Sagittate.png'
import Hastate from './assets/Hastate.png'
import Lyrate from './assets/Lyrate.png'
import Spatulate from './assets/Spatulate.png'
import Rhomboid from './assets/Rhomboid.png'
import Oblique from './assets/Oblique.png'
import Cuneate from './assets/Cuneate.png'

export const linkNavigationBar = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>,
        title: "Marketplace",
        link: "/",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>,
        title: "Map",
        link: "/map",
    },
    {
        icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>,
        title: "Messages",
        link: "/messages",
    },
    // {
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7">
    //     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    //     </svg>,
    //     title: "Community",
    //     link: "/",
    // },

    // {
    //     icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-8 h-8">
    //     <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    //     </svg>,
    //     title: "Trade",
    //     link: "/trade",
    // },
]

export const shortcutsNavigationBar = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>,
        title: "My Plants",
        link: "/my-plants",
    },
    // {
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
    //     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    //     </svg>,
    //     title: "Favourites", 
    //     link: "/favourites",
    // },
];

//filters data

export const status = [
    { name: 'Available' },
    { name: 'Unavailable' },
]

export const plantsCategories = [
    { name: 'Homeplant' },
    { name: 'Fruit' },
    { name: 'Vegetable' },
    { name: 'Flowers'},
    { name: 'Seed' },
    { name: 'Herbs' },
    { name: 'Waterplant' },
    { name: 'Others' },
  ]

export const SunPreferences = [
    { name: 'sunPref', value: 'Full Sun' },
    { name: 'sunPref', value: 'Part Sun' },
    { name: 'sunPref', value: 'Part Shade' },
    { name: 'sunPref', value: 'Shade' },
]

export const InteriorLight = [
    { name: 'interLight', value: 'Direct Sun' },
    { name: 'interLight', value: 'Bright' },
    { name: 'interLight', value: 'Medium' },
    { name: 'interLight', value: 'Low' },
]

export const SoilPreferences = [
    { name: 'soilPref', value: 'Fertile' },
    { name: 'soilPref', value: 'Moist' },
    { name: 'soilPref', value: 'Wet' },
    { name: 'soilPref', value: 'Dry' },
    { name: 'soilPref', value: 'Well-Drained' },
]

export const WaterRequirements = [
    { name: 'waterReq', value: 'Low' },
    { name: 'waterReq', value: 'Medium' },
    { name: 'waterReq', value: 'High' },
]

export const NativeHab = [
    { name: 'nativeHab', value: 'Wetland' },
    { name: 'nativeHab', value: 'Meadow/Field' },
    { name: 'nativeHab', value: 'Prairie/Grassland' },
    { name: 'nativeHab', value: 'Desert' },
    { name: 'nativeHab', value: 'Coastal' },
    { name: 'nativeHab', value: 'Woodland/Forest' },
    { name: 'nativeHab', value: 'Mountains' },
    { name: 'nativeHab', value: 'Roadside' },
]

export const Measurement = [
    { name: 'None' },
    { name: 'Inches' },
    { name: 'Meter' },
    { name: 'Feet' },
]

export const Foliage = [
    { name: 'None' },
    { name: 'Linear', img: linear },
    { name: 'Ovate', img: ovate },
    { name: 'Elliptical', img: elliptical },
    { name: 'Oblong', img: oblong },
    { name: 'Cordate', img: Cordate },
    { name: 'Lanceolate', img: Lanceolate },
    { name: 'Acicular', img: Acicular },
    { name: 'Reniform', img: Reniform },
    { name: 'Orbicular', img: Orbicular},
    { name: 'Sagittate', img: Sagittate },
    { name: 'Hastate', img: Hastate },
    { name: 'Lyrate', img: Lyrate },
    { name: 'Spatulate', img: Spatulate },
    { name: 'Rhomboid', img: Rhomboid },
    { name: 'Oblique', img: Oblique },
    { name: 'Cuneate', img: Cuneate },
]

export const FoliageYesOrNo = [
    { name: 'None' },
    { name: 'Yes' },
    { name: 'No' },
]

export const FloweringPeriod = [
    { name: 'flowPer', value: 'Jan' },
    { name: 'flowPer', value: 'Feb' },
    { name: 'flowPer', value: 'Mar' },
    { name: 'flowPer', value: 'Apr' },
    { name: 'flowPer', value: 'May' },
    { name: 'flowPer', value: 'Jun' },
    { name: 'flowPer', value: 'Jul' },
    { name: 'flowPer', value: 'Aug' },
    { name: 'flowPer', value: 'Sept' },
    { name: 'flowPer', value: 'Oct' },
    { name: 'flowPer', value: 'Nov' },
    { name: 'flowPer', value: 'Dec' },
]



