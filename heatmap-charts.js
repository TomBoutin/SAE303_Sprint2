import * as echarts from 'echarts';
import { M } from './js/model.js';

await M.init();




var tab = [
  "ADAM Fabrice", "ADAMCZYK Natacha", "AYMARD Adrien", "AYMARD Alain", "BABIN Valentin", "BERTHIER Hélène", "CHANTELOUP Amelin", "CHUPIN Suzanne", "CREDEVILLE Maxime", "CRESPIN Benoit", "DAL BELLO Marine", "DEMAISON Guillaume", "DUBREUIL Anne-Sophie", "DULAC Benoit", "FEYDI Philippe", "FIAMMETTI Deborah", "FLITTI Eric", "GERAUD Fabien", "GOUDARD Bérénice", "GRASSET Véronique", "GUEDIRA Réda", "JARDOU Thomas", "JAUFFRET Manon", "JOUY Maxime", "KABAB Simon", "LAFONT Mathieu", "LAVEFVE Valérie", "LASCAUD Raphaël", "LAZARE Jean-Cédric", "LE BAIL Emma", "LECOMTE Catherine", "LU Inès", "MARTY Thomas", "MONDOLLOT Rémi", "MORA Frédéric", "MOUTAT Audrey", "NENIN Cédric", "PAILLIER Stéphane", "PINAUD Anaïs", "PORRO Heinich", "PORTAL Nicolas", "SABOURIN Erwan", "SINCLAIR Diego", "SPRINGINSFELD Denis", "THARAUD Sébastien", "TZVETKOVA Maria", "TURBELIN Pierre", "VALETTE Sophie", "VEILLON Pascal"
];
let allProf = {};
const dataAll = M.getEvents('mmi1').concat(M.getEvents('mmi2').concat(M.getEvents('mmi3')));



var chartDom = document.getElementById('heatmap-charts');
var myChart = echarts.init(chartDom, "dark");
var option;

const hours = ["20h","19h","18h","17h","16h","15h","14h","13h","12h","11h","10h","9h","8h"];
const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];
const data = [[0,0, 5]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
option = {
  tooltip: {
    position: 'bottom'
  },
  grid: {
    height: '80%',
    top: '10%'
  },
  xAxis: {
    type: 'category',
    data: days,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: hours,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '0%'
  },
  series: [
    {
      name: 'Cours',
      type: 'heatmap',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

option && myChart.setOption(option);