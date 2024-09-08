const allDays = [];

const createCalendar = () => {
  let now = new Date();

  let currentMonth = now.getMonth();

  let yearMonths = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

  document.querySelector("h1").innerHTML = yearMonths[currentMonth];

  let currentYear = now.getFullYear();

  let lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < lastDay; i++) {
    let calendar = document.getElementById("calendar");
    let divDay = document.createElement("div");
    allDays.push([]);
    divDay.className = "day";
    let h3 = document.createElement("h3");
    if (i + 1 === now.getDate()) {
      h3.className = "color-epic";
    }
    h3.innerText = i + 1;
    calendar.appendChild(divDay).appendChild(h3);
    divDay.addEventListener("click", function () {
      removeSelected();
      divDay.classList.add("selected");
      getMeetingDay(i + 1);
      if (allDays[i].length > 0) {
        showMeeting(i);
      } else {
        document.getElementById("appointments").style.display = "none";
      }
      const saveMeetingBtn = document.querySelector("button");
      saveMeetingBtn.onclick = (event) => {
        event.preventDefault();
        saveMeeting();
        document.getElementById("newMeetingTime").value = "";
        document.getElementById("newMeetingName").value = "";
        showMeeting(i);
        if (allDays[i].length > 0) {
          const hasApps = document.createElement("span");
          hasApps.className = "dot";
          divDay.appendChild(hasApps);
        }
      };
    });
  }
};

const removeSelected = function () {
  let selectedElement = document.querySelector(".day.selected");
  if (selectedElement) {
    selectedElement.classList.remove("selected");
  }
};

const getMeetingDay = (value) => {
  let meetingDay = document.getElementById("newMeetingDay");
  meetingDay.innerText = value;
};

const saveMeeting = () => {
  let meetingTime = document.getElementById("newMeetingTime").value;
  let meetingName = document.getElementById("newMeetingName").value;
  const selectedDay = document.getElementById("newMeetingDay").innerText;
  const dayArray = allDays[parseInt(selectedDay - 1)];
  dayArray.push(meetingTime + " - " + meetingName);
};

const showMeeting = (value) => {
  const appointments = allDays[value];
  const appointmentsList = document.getElementById("appointmentsList");
  appointmentsList.innerHTML = "";
  appointments.forEach((appointment) => {
    const singleApp = document.createElement("li");
    singleApp.innerText = appointment;
    appointmentsList.appendChild(singleApp);
  });
  document.getElementById("appointments").style.display = "block";
};

window.onload = () => {
  createCalendar();
};
