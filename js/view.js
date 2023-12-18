import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

V.uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  hourOptions: { hour: '2-digit', minute: '2-digit', hour12: false },
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
    
  },
  month: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    scheduleView: true,
    taskView: false,
    eventView: ['time'],
  },
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },

  theme: {

    week: {
      
      nowIndicatorLabel: {
        color: '#f0c551',
        fontWeight: 'bold',
      },

      nowIndicatorToday: {
        border: '1px solid #f0c551',
      },

      nowIndicatorBullet: {
        backgroundColor: '#f0c551',
      },

      nowIndicatorPast: {
        border: '1px dashed #f0c551',
      },

    },
    
  }


});






let mmi1 = document.querySelector('#but1-select');
let mmi2 = document.querySelector('#but2-select');
let mmi3 = document.querySelector('#but3-select');

V.ViewGroups = function () {
let annee = document.querySelector('#annee');
  if (annee.value == "mmi1") {

    mmi1.style.display = "flex";
    mmi2.style.display = "none";
    mmi3.style.display = "none";
    
  }
  else if (annee.value == "mmi2") {

    mmi1.style.display = "none";
    mmi2.style.display = "flex";
    mmi3.style.display = "none";
  }
  else if (annee.value == "mmi3") {

    mmi1.style.display = "none";
    mmi2.style.display = "none";
    mmi3.style.display = "flex";
  }
  else if (annee.value == "all") {

    mmi1.style.display = "none";
    mmi2.style.display = "none";
    mmi3.style.display = "none";
  }
};

V.colors = {
  mmi1: {
    CM: "#c1aed4",
    TD: "#d9cde5",
    TP: "#73687f",
    Autre: "#c1aed4",
  },
  mmi2: {
    CM: "#35a663",
    TD: "#87c7a0",
    TP: "#257545",
    Autre: "#35a663",
  },
  mmi3: {
    CM: "#3663ad",
    TD: "#85a1cd",
    TP: "#234579",
    Autre: "#3663ad",
  },
};





export { V };
