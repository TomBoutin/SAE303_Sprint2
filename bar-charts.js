import { M } from './js/model.js';
import * as echarts from 'echarts';

await M.init();


var tab = [
  "ADAM Fabrice", "ADAMCZYK Natacha", "AYMARD Adrien", "AYMARD Alain", "BABIN Valentin", "BERTHIER Hélène", "CHANTELOUP Amelin", "CHUPIN Suzanne", "CREDEVILLE Maxime", "CRESPIN Benoit", "DAL BELLO Marine", "DEMAISON Guillaume", "DUBREUIL Anne-Sophie", "DULAC Benoit", "FEYDI Philippe", "FIAMMETTI Deborah", "FLITTI Eric", "GERAUD Fabien", "GOUDARD Bérénice", "GRASSET Véronique", "GUEDIRA Réda", "JARDOU Thomas", "JAUFFRET Manon", "JOUY Maxime", "KABAB Simon", "LAFONT Mathieu", "LAVEFVE Valérie", "LASCAUD Raphaël", "LAZARE Jean-Cédric", "LE BAIL Emma", "LECOMTE Catherine", "LU Inès", "MARTY Thomas", "MONDOLLOT Rémi", "MORA Frédéric", "MOUTAT Audrey", "NENIN Cédric", "PAILLIER Stéphane", "PINAUD Anaïs", "PORRO Heinich", "PORTAL Nicolas", "SABOURIN Erwan", "SINCLAIR Diego", "SPRINGINSFELD Denis", "THARAUD Sébastien", "TZVETKOVA Maria", "TURBELIN Pierre", "VALETTE Sophie", "VEILLON Pascal"
];
let allProf = {};
const data = M.getEvents('mmi1').concat(M.getEvents('mmi2').concat(M.getEvents('mmi3')));
var chartDom = document.getElementById('bar-charts');
var myChart = echarts.init(chartDom, 'dark');
var option;

option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {
    selected: {
      'TOTAL': false

    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: tab
  },
  series: [
    {
      name: 'CM',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [

      ]
    },
    {
      name: 'TD',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [

      ]
    },
    {
      name: 'TP',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [

      ]
    },
    {
      name: 'TOTAL',
      type: 'bar',

      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [

      ]
    }


  ]
};

for (let ev of tab) {
  allProf[ev] = data.filter((event) => { return event.title.includes(ev) });
}

let semestre = document.getElementById("semestre");
function updateData(semestreValue) {
  option.series.filter(series => {
    series.data = [];
  });

  for (let ev in allProf) {
    let cm = 0;
    let td = 0;
    let tp = 0;
    for (let i = 0; i < allProf[ev].length; i++) {
      if (semestreValue === "0" || allProf[ev][i].semester.includes(semestreValue)) {
        if (allProf[ev][i].title.includes("CM")) cm += allProf[ev][i].hours;
        if (allProf[ev][i].title.includes("TD")) td += allProf[ev][i].hours;
        if (allProf[ev][i].title.includes("TP")) tp += allProf[ev][i].hours;
      }
    }
    option.series[0].data.push(cm);
    option.series[1].data.push(td);
    option.series[2].data.push(tp);
    option.series[3].data.push(cm + td + tp);
  }
  myChart.setOption(option);
}
semestre.addEventListener("change", function () {
  const semestreValue = semestre.options[semestre.selectedIndex].value;
  updateData(semestreValue);
});
updateData(semestre.options[semestre.selectedIndex].value);


console.log(allProf);

option && myChart.setOption(option);