import * as echarts from 'echarts';
import { M } from './js/model.js';

await M.init();




var tab = ["ADAM Fabrice", "ADAMCZYK Natacha", "AYMARD Adrien","AYMARD Alain", "BABIN Valentin", "BERTHIER Hélène", "BONNAUD Lucile","CHANTELOUP Amelin", "CHUPIN Suzanne", "CREDEVILLE Maxime", "CRESPIN Benoit", "DAL BELLO Marine", "DEMAISON Guillaume", "DUBREUIL Anne-Sophie", "DULAC Benoit", "FEYDI Philippe", "FIAMMETTI Deborah", "FLITTI Eric", "GERAUD Fabien", "GOUDARD Bérénice", "GRASSET Véronique", "GUEDIRA Réda", "JARDOU Thomas", "JAUFFRET Manon", "JOUY Maxime", "KABAB Simon", "LAFONT Mathieu", "LAVEFVE Valérie", "LASCAUD Raphaël", "LAZARE Jean-Cédric", "LE BAIL Emma", "LECOMTE Catherine", "LU Inès", "MARTY Thomas", "MONDOLLOT Rémi", "MORA Frédéric", "MOUTAT Audrey", "MINIER Jules", "NENIN Cédric", "PAILLIER Stéphane", "PINAUD Anaïs", "PORRO Heinich", "PORTAL Nicolas", "SABOURIN Erwan", "SINCLAIR Diego", "SPRINGINSFELD Denis", "THARAUD Sébastien", "TZVETKOVA Maria", "TURBELIN Pierre", "VALETTE Sophie", "VEILLON Pascal"
];
let allProf = {};

const dataAll = M.getEvents('mmi1').concat(M.getEvents('mmi2').concat(M.getEvents('mmi3')));


for (let ev of tab) {
  allProf[ev] = {};

  let profEvents = dataAll.filter((event) => { return event.title.includes(ev) });

  for (let i = 1; i <= 6; i++) {
    let semesterEvents = profEvents.filter((event) => { return event.semester.includes(i.toString()) });

    allProf[ev]["Semestre " + i] = {};

    // Supposons que 'resources' est un tableau de tous les cours possibles
    let resources = [...new Set(semesterEvents.map(event => event.ressources))];

    for (let resource of resources) {
      let resourceEvents = semesterEvents.filter((event) => { return event.ressources === resource });

      allProf[ev]["Semestre " + i][resource] = {
        "CM": resourceEvents.filter((event) => { return event.type.includes("CM") }),
        "TD": resourceEvents.filter((event) => { return event.type.includes("TD") }),
        "TP": resourceEvents.filter((event) => { return event.type.includes("TP") })
      };
    }
  }
}

let data = [];

let selectName = document.getElementById("intervenant");

selectName.addEventListener("change", function () {

  update(selectName.value);
  myChart.setOption(option);



});

function update(name) {

  data.length = 0;

  for (let prof in allProf) {
    if (prof === name) {
      let profData = {
        name: prof,
        
        children: []
      };

      for (let sem in allProf[prof]) {
        let semData = {
          name: sem,

          children: []
        };

        for (let course in allProf[prof][sem]) {
          let courseData = {
            name: course,
            
            children: []
          };

          let typeHours = {};

          for (let type in allProf[prof][sem][course]) {
            allProf[prof][sem][course][type].filter(event => {
              if (!typeHours[event.type]) {
                typeHours[event.type] = 0;
              }

              typeHours[event.type] += event.hours;
            });
            
          }

          for (let type in typeHours) {
            let typeData = {
              name: type,
              value: typeHours[type],
              

            };
            courseData.children.push(typeData);
          }

          semData.children.push(courseData);
        }

        profData.children.push(semData);
      }

      data.push(profData);
    }
  }
}

update(selectName.value);




var chartDom = document.getElementById('sunburst-charts');
var myChart = echarts.init(chartDom, 'dark');
var option;

option = {
  series: {
    type: 'sunburst',

    data: data,
    radius: [0, '95%'],
    sort: undefined,
    emphasis: {
      focus: 'ancestor'
    },
    levels: [
      {

      },
      {
        r0: '0%',
        r: '20%', 
        itemStyle: {
          borderWidth: 2,
          color: '#4a3052'
        },
        label: {
          rotate: 'tangential'
        }
      },
      {
        r0: '20%', 
        r: '47%', 
        itemStyle: {
          color: '#9560a4'
        },
        
      },
      {
        r0: '47%', 
        r: '78%', 
        itemStyle: {
          color: '#aa7fb6'
        },
      },
      {
        r0: '78%', 
        r: '83%', 
        label: {
          position: 'outside',
          padding: 3,
          silent: false
        },
        itemStyle: {
          borderWidth: 2,
          color: '#caafd1'
        }
      },

    ]
  }
};

option && myChart.setOption(option);