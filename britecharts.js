import { M } from './js/model.js';

await M.init();

// const tab = [
//     { name: 'Caca', id: 1, quantity: 86, percentage: 5 },
//     { name: 'Pipi', id: 2, quantity: 300, percentage: 18 },
//     { name: 'Zizi', id: 3, quantity: 276, percentage: 16 },
//     { name: 'Radiant', id: 4, quantity: 195, percentage: 11 },
//     { name: 'Sparkling', id: 5, quantity: 36, percentage: 2 },
//     { name: 'Caca', id: 0, quantity: 814, percentage: 48 }
//   ];

// Nom des intervenants
// MOUTAT Audrey
// MORA Frédéric
// ADAMCZYK Natacha
// GUEDIRA Réda
// LAVEFVE Valérie
// SPRINGINSFELD Denis
// CRESPIN BenoitADAM Fabrice
// AYMARD Adrien
// AYMARD Alain
// BABIN Valentin
// BONNAUD Lucile
// BERTHIER Hélène
// CHANTELOUP Amelin
// CREDEVILLE Maxime
// CHUPIN Suzanne
// DAL BELLO Marine
// DEMAISON Guillaume
// DULAC Benoit
// DUBREUIL Anne-Sophie
// FEYDI Philippe
// FIAMMETTI Deborah
// FLITTI Eric
// GERAUD Fabien
// GOUDARD Bérénice
// GRASSET Véronique
// JARDOU Thomas
// JAUFFRET Manon
// JOUY Maxime
// LAFONT Mathieu
// LASCAUD Raphaël
// LAZARE Jean-Cédric
// LE BAIL Emma
// LECOMTE Catherine
// MARTY Thomas
// MONDOLLOT Rémi
// MINIER Jules
// NENIN Cédric
// PAILLIER Stéphane
// PINAUD Anaïs
// PORRO Heinich
// PORTAL Nicolas
// SABOURIN Erwan
// SINCLAIR Diego
// THARAUD Sébastien
// TZVETKOVA Maria
// TURBELIN Pierre
// VALETTE Sophie
// LU Inès
// KABAB Simon
// VEILLON Pascal

const intervenant = [

];

const tab = [];

const data = M.getEvents('mmi1').concat(M.getEvents('mmi2').concat(M.getEvents('mmi3')));

for (let ev of data) {
  console.log(ev);


  tab.push({ name: ev.title, quantity: 30 });

}

function createDonutChart() {
  let donutChart = britecharts.donut();

  donutChart
    .width(400)
    .height(300);

  d3.select('.js-donut-container').datum(tab).call(donutChart);

}

createDonutChart();


