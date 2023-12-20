import * as echarts from "echarts";
import { M } from "./js/model.js";

await M.init();

var tab = [
  "ADAM Fabrice",
  "ADAMCZYK Natacha",
  "AYMARD Adrien",
  "AYMARD Alain",
  "BABIN Valentin",
  "BERTHIER Hélène",
  "BONNAUD Lucile",
  "CHANTELOUP Amelin",
  "CHUPIN Suzanne",
  "CREDEVILLE Maxime",
  "CRESPIN Benoit",
  "DAL BELLO Marine",
  "DEMAISON Guillaume",
  "DUBREUIL Anne-Sophie",
  "DULAC Benoit",
  "FEYDI Philippe",
  "FIAMMETTI Deborah",
  "FLITTI Eric",
  "GERAUD Fabien",
  "GOUDARD Bérénice",
  "GRASSET Véronique",
  "GUEDIRA Réda",
  "JARDOU Thomas",
  "JAUFFRET Manon",
  "JOUY Maxime",
  "KABAB Simon",
  "LAFONT Mathieu",
  "LAVEFVE Valérie",
  "LASCAUD Raphaël",
  "LAZARE Jean-Cédric",
  "LE BAIL Emma",
  "LECOMTE Catherine",
  "LU Inès",
  "MARTY Thomas",
  "MINIER Jules",
  "MONDOLLOT Rémi",
  "MORA Frédéric",
  "MOUTAT Audrey",
  "NENIN Cédric",
  "PAILLIER Stéphane",
  "PINAUD Anaïs",
  "PORRO Heinich",
  "PORTAL Nicolas",
  "SABOURIN Erwan",
  "SINCLAIR Diego",
  "SPRINGINSFELD Denis",
  "THARAUD Sébastien",
  "TZVETKOVA Maria",
  "TURBELIN Pierre",
  "VALETTE Sophie",
  "VEILLON Pascal",
];
let allProf = {};
const dataAll = M.getEvents("mmi1").concat(
  M.getEvents("mmi2").concat(M.getEvents("mmi3"))
);

/**
 * hour : un entier entre 0 et 23 qui détermine une tranche d'une heure (ex: 14 pour la tranche 14h-15h)
 * start : un objet Date qui détermine l'heure de début d'un cours
 * end : un objet Date qui détermine l'heure de fin d'un cours
 * retourne la durée de l'intersection entre [start, end] et [hour, hour+1] en heures (0 si pas d'intersection)
 */
let intersectByHour = function (hour, start, end) {
  let interStart = new Date(start);
  interStart.setHours(hour);
  interStart.setMinutes(0);
  let interEnd = new Date(end);
  interEnd.setHours(hour + 1);
  interEnd.setMinutes(0);

  // maintenant il faut déterminer s'il existe une intersection entre [interStart, interEnd] et les horaires du cours [start, end]

  if (interEnd <= start)
    // si l'heure de fin est avant l'heure de début du cours, pas d'intersection
    return 0;
  else if (interStart >= end)
    // si l'heure de début est après l'heure de fin du cours, pas d'intersection
    return 0;
  else {
    // il existe une intersection entre [interStart, interEnd] et les horaires du cours [start, end]
    return (
      (Math.min(interEnd, end) - Math.max(interStart, start)) / 1000 / 3600
    );
    // on prend le minimum des deux heures de fin et le maximum des deux heures de début
    // et on retourne la durée de l'intersection en heures
  }
};

// console.log(intersectByHour(11, dataAll[0].start, dataAll[0].end));

// console.log(dataAll[0].start);
// console.log(dataAll[0].end);

for (let ev of tab) {
  allProf[ev] = {};

  let profEvents = dataAll.filter((event) => {
    return event.title.includes(ev);
  });

  for (let i = 0; i <= 4; i++) {
    let dayEvents = profEvents.filter((event) => {
      return event.day === i;
    });

    allProf[ev][i] = {};

    for (let j = 8; j <= 20; j++) {
      let hourDurations = 0;
      for (let event of dayEvents) {
        let hourEvents = intersectByHour(j, event.start, event.end);
        hourDurations += hourEvents;
      }
      allProf[ev][i][j] = hourDurations;
    }
  }
}


var chartDom = document.getElementById("heatmap-charts");
var myChart = echarts.init(chartDom, "dark");
var option;

const hours = [
  "20h",
  "19h",
  "18h",
  "17h",
  "16h",
  "15h",
  "14h",
  "13h",
  "12h",
  "11h",
  "10h",
  "9h",
  "8h",
];
const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const data = []
  .map(function (item) {
    return [item[1], item[0], item[2] || "-"];
  });

let selectName = document.getElementById("intervenant");
selectName.addEventListener("change", () => {
  update(selectName.value);
  myChart.setOption(option);
});

function update(name) {

  data.length = 0;

  for (let prof in allProf) {
    if (prof == name) {
      for (let day in allProf[prof]) {

        for (let hour in allProf[prof][day]) {
          if (allProf[prof][day][hour] > 0) {
            data.push([parseInt(day), 12 - (hour - 8), allProf[prof][day][hour]]);
            // le calcule permet de convertir les heures en index de tableau (ex: 20h -> 0, 19h -> 1, 20h -> 2 etc.)
          }

        }
      }
    }
  }
}



update(selectName.value);



option = {
  tooltip: {
    position: "bottom",
  },
  grid: {
    height: "80%",
    top: "10%",
  },
  xAxis: {
    type: "category",
    data: days,
    splitArea: {
      show: true,
    },
  },
  yAxis: {
    type: "category",
    data: hours,
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    min: 0,
    max: 15,
    calculable: true,
    orient: "horizontal",
    left: "center",
    bottom: "0%",
  },
  series: [
    {
      name: "Cours",
      type: "heatmap",
      data: data,
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

option && myChart.setOption(option);
