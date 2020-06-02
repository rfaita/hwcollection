import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const cars = [
  {
    "name": "2019 Kia Stinger GT",
    "number": "198",
    "year": "2020",
    "series": "Factory Fresh",
    "color": "",
    "tampo": "",
    "chassisColorType": "",
    "windowColor": "",
    "interiorColor": "",
    "wheelType": "",
    "key": "",
    "country": "",
    "notes": "New ModelBase code(s):",
    "photo": "",
    "numberTotal": "250"
  },
  {
    "name": "Land Rover Defender 90",
    "number": "199",
    "year": "2020",
    "series": "Factory Fresh",
    "color": [
      "Red"
    ],
    "tampo": "#13, Dima, & Hot Wheels logo on both sides",
    "baseColorType": [
      "Red",
      "Black Plastic"
    ],
    "windowColor": "Tinted",
    "interiorColor": "Black",
    "wheelType": "BAJA5",
    "key": "GHB27",
    "country": "Malaysia",
    "notes": "Base code(s):",
    "photo": "",
    "numberTotal": "250",
    "seriesNumber": "4",
    "seriesTotalNumber": "10"
  },
  {
    "name": "Alpha Pursuit",
    "number": "206",
    "year": "2020",
    "series": "HW Rescue",
    "color": [
      "Grey"
    ],
    "tampo": "Black design, white \"Police\" text",
    "baseColorType": [
      "Black",
      "Plastic"
    ],
    "windowColor": "Tinted",
    "interiorColor": "Blue",
    "wheelType": "Black DD8",
    "key": "",
    "country": "Malaysia",
    "notes": "New ModelBase code(s):",
    "photo": "",
    "numberTotal": "250",
    "seriesNumber": "1",
    "seriesTotalNumber": "10"
  },
  {
    "name": "'65 Ford Galaxie",
    "number": "17",
    "year": "2011",
    "series": "Vintage Racing",
    "color": [
      "Orange"
    ],
    "tampo": "'36' '427Cu. In.'",
    "baseColorType": [
      "Unpainted",
      "Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Black",
    "wheelType": "Orange SRR",
    "key": "T8467",
    "country": "Thailand",
    "notes": "",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/2/2e/65FordGalaxie_Vintage.JPG/revision/latest/scale-to-width-down/375?cb=20110529234953",
    "numberTotal": "30"
  },
  {
    "name": "'65 Ford Galaxie",
    "number": "20",
    "year": "2011",
    "series": "Vintage Racing",
    "color": [
      "Metalflake Grey and Red"
    ],
    "tampo": "'23' '427 C.I.'",
    "baseColorType": [
      "Unpainted",
      "Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Black",
    "wheelType": "Black SRR",
    "key": "T8534",
    "country": "Thailand",
    "notes": "",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/6/6d/IMG_1661_01c1000.jpg/revision/latest/scale-to-width-down/375?cb=20110919222757",
    "numberTotal": "30"
  },
  {
    "name": "'65 Ford Galaxie",
    "number": "29",
    "year": "2011",
    "series": "Vintage Racing",
    "color": [
      "Beige"
    ],
    "tampo": "'26' '427 CU. IN.'",
    "baseColorType": [
      "Unpainted",
      "Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Black",
    "wheelType": "SRR",
    "key": "T8537",
    "country": "Thailand",
    "notes": "",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/b/b5/Image_Not_Available.jpg/revision/latest/scale-to-width-down/375?cb=20151025125428",
    "numberTotal": "30"
  },
  {
    "name": "'65 Ford Galaxie",
    "number": "",
    "year": "2012",
    "series": "HW Racing Stockcars",
    "color": [
      "Red"
    ],
    "tampo": "Augusta motor sales'121' '427 C.I.'",
    "baseColorType": [
      "Unpainted",
      "Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Black",
    "wheelType": "Black SRR",
    "key": "W8324",
    "country": "Thailand",
    "notes": "Base code(s): E17",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/9/92/2012-HWR-Stockcar-65FordGalaxie-Red.jpg/revision/latest/scale-to-width-down/375?cb=20120908195543"
  },
  {
    "name": "'65 Ford Galaxie",
    "number": "",
    "year": "2013",
    "series": "HWC.com 12",
    "color": [
      "Spectraflame Aqua"
    ],
    "tampo": "White roof",
    "baseColorType": [
      "Unpainted",
      "Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Pearl white",
    "wheelType": "Replica RL",
    "key": "YO464",
    "country": "Thailand",
    "notes": "Base code(s):�",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/a/a6/HWC_Series_Twelve_Neo-Classics_%E2%80%9865_Ford_Galaxie.jpg/revision/latest/scale-to-width-down/375?cb=20191012083032"
  },
  {
    "name": "'65 Ford Galaxie",
    "number": "16",
    "year": "2014",
    "series": "Cool Classics",
    "color": [
      "Spectrafrost Blue"
    ],
    "tampo": "\"Far * Out\", \"*Galaxie*\", \"427 C.I.D.\", \"Carolina Tested\"",
    "baseColorType": [
      "Unpainted",
      "Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Black",
    "wheelType": "RSW",
    "key": "BDR37",
    "country": "Thailand",
    "notes": "Base code(s): G30",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/9/97/65-Ford-A.-Galaxie-500.jpg/revision/latest/scale-to-width-down/375?cb=20141118162357",
    "numberTotal": "30"
  },
  {
    "name": "'65 Ford Galaxie",
    "number": "",
    "year": "2018",
    "series": "50th Anniv Favorites",
    "color": [
      "Light Blue"
    ],
    "tampo": "Gulf Livery, orange stripe roof and hood, 65 on doors and hood, sponsor logos (Koni, Autolite, Firestone) on sides, HW 50th Anniversary logo on side rear 1/4 panels, details brake lights",
    "baseColorType": [
      "Unpainted",
      "Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Black",
    "wheelType": "SRR",
    "key": "FLF45",
    "country": "Malaysia",
    "notes": "Base code(s): L33",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/f/f4/%2765_Ford_Galaxy._Gulf.Rear.jpg/revision/latest/scale-to-width-down/375?cb=20181110003310",
    "seriesNumber": "10",
    "seriesTotalNumber": "10"
  },
  {
    "name": "'89 Mazda Savanna RX-7 FC3S",
    "number": "223",
    "year": "2020",
    "series": "",
    "color": "",
    "tampo": "",
    "chassisColorType": "",
    "windowColor": "",
    "interiorColor": "",
    "wheelType": "",
    "key": "",
    "country": "",
    "notes": "New ModelBase code(s):",
    "photo": "",
    "numberTotal": "250"
  },
  {
    "name": "'17 Lamborghini Urus",
    "number": "???/250",
    "year": "2020",
    "series": "HW Exotics",
    "color": "",
    "tampo": "",
    "chassisColorType": "",
    "windowColor": "",
    "interiorColor": "",
    "wheelType": "",
    "key": "GHB36",
    "country": "",
    "notes": "New ModelBase code(s):",
    "photo": "",
    "seriesNumber": "1",
    "seriesTotalNumber": "10"
  },
  {
    "name": "McLaren Speedtail",
    "number": "",
    "year": "2020",
    "series": "HW Exotics",
    "color": [
      "Metallic Light Blue"
    ],
    "tampo": "",
    "baseColorType": [
      "Black",
      "Plastic"
    ],
    "windowColor": "Tinted (smoke)",
    "interiorColor": "",
    "wheelType": "Rear: Gray 10SPFront: Gray AeroDisc",
    "key": "",
    "country": "Malaysia",
    "notes": "New ModelBase code(s):",
    "photo": ""
  },
  {
    "name": "Ford F-150 SVT Lightning",
    "number": "1",
    "year": "2020",
    "series": "Fast & Furious Premium: Motor City Muscle",
    "color": [
      "Red"
    ],
    "tampo": "",
    "baseColorType": "",
    "windowColor": "",
    "interiorColor": "",
    "wheelType": "",
    "key": "GJR68",
    "country": "",
    "notes": "",
    "photo": "",
    "numberTotal": "5"
  },
  {
    "name": "'96 Chevrolet Impala SS",
    "number": "???/250",
    "year": "2020",
    "series": "Nightburnerz",
    "color": "",
    "tampo": "",
    "chassisColorType": "",
    "windowColor": "",
    "interiorColor": "",
    "wheelType": "",
    "key": "",
    "country": "",
    "notes": "New ModelBase code(s):",
    "photo": "",
    "seriesNumber": "2",
    "seriesTotalNumber": "10"
  },
  {
    "name": "Mazda RX-3",
    "number": "5",
    "year": "2016",
    "series": "Car Culture Series: Japan Historics",
    "color": [
      "Metalflake Purple"
    ],
    "tampo": "Black stripes & '3' on sides & hood, 'Advan', NGK logo, JCCS logo & JNC logo on sides",
    "baseColorType": [
      "Unpainted Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Dark Grey",
    "wheelType": "C4SPRR",
    "key": "DJF78",
    "country": "Malaysia",
    "notes": "Base code(s): H52, J09",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/1/18/Mazda_RX-3-2016_Car_Culture-Japan_Historics.jpg/revision/latest/scale-to-width-down/375?cb=20170702184030",
    "numberTotal": "5"
  },
  {
    "name": "Mazda RX-3",
    "number": "2",
    "year": "2017",
    "series": "Car Culture Series: Race Day",
    "color": [
      "Yellow"
    ],
    "tampo": "Green Stripes on sides, hood & roof, '78' on sides & hood, 'NGK' 'Yokohama' & Hotwheels logos on side, 'M. Jones' on roof",
    "baseColorType": [
      "Unpainted Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Black",
    "wheelType": "Black� C4SPRR",
    "key": "DWH77",
    "country": "Thailand",
    "notes": "Base code(s):�K14",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/1/1c/Mazda_RX3-HW_2017_Car_Culture_%28Race_Day%29--2.jpg/revision/latest/scale-to-width-down/375?cb=20170701040945",
    "numberTotal": "5"
  },
  {
    "name": "Mazda RX-3",
    "number": "2",
    "year": "2018",
    "series": "Car Culture Series: Japan Historics 2",
    "color": [
      "Orange"
    ],
    "tampo": "GReddy & JNC logos on lower doors",
    "baseColorType": [
      "Unpainted Metal"
    ],
    "windowColor": "Clear",
    "interiorColor": "Dark grey",
    "wheelType": "CBRR8SP",
    "key": "FLC07",
    "country": "Thailand",
    "notes": "Base code(s): K44",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/0/05/E4CD6A90-A503-4639-A3EA-5A5D8FE172F4.jpeg/revision/latest/scale-to-width-down/375?cb=20190215224956",
    "numberTotal": "5"
  },
  {
    "name": "Mazda RX-3",
    "number": "1",
    "year": "2019",
    "series": "Fast & Furious Premium: Fast Rewind",
    "color": [
      "Red"
    ],
    "tampo": "Licensed graphics from The Fast and the Furious (2001)",
    "baseColorType": [
      "ZAMAC"
    ],
    "windowColor": "Clear",
    "interiorColor": "Black",
    "wheelType": "CBRR8SP",
    "key": "GHH20",
    "country": "Thailand",
    "notes": "Base code(s): M37, M38",
    "photo": "https://vignette.wikia.nocookie.net/hotwheels/images/6/6b/Fast-Rewind-RX3-Loose.jpg/revision/latest/scale-to-width-down/375?cb=20191023142523",
    "numberTotal": "5"
  }
];

ReactDOM.render(
  <App cars={cars} />,
  document.getElementById('root')
);