// home.js
$(document).ready(function () {
  // 1. Show today's date
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  $("#todayDate").text(today.toLocaleDateString(undefined, options));

  // 2. Show welcome message depending on login state
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    $("#welcomeMessage").text("You are signed in. You can go straight to Services or Appointments.");
  } else {
    $("#welcomeMessage").text("You are not signed in yet. Use the Login page to start saving your appointments.");
  }

  // 3. Read appointments from localStorage and show summary / next appointment
  const apptsRaw = localStorage.getItem("appointments");
  let appointments = [];
  try {
    if (apptsRaw) {
      appointments = JSON.parse(apptsRaw);
    }
  } catch (e) {
    appointments = [];
  }

  function findNextAppointmentIndex() {
    if (!appointments || appointments.length === 0) return -1;
    let nextIndex = 0;
    let nextDate = new Date(appointments[0].date + "T" + appointments[0].time);
    for (let i = 1; i < appointments.length; i++) {
      const d = new Date(appointments[i].date + "T" + appointments[i].time);
      if (d < nextDate) {
        nextDate = d;
        nextIndex = i;
      }
    }
    return nextIndex;
  }

  if (appointments.length > 0) {
    $("#homeApptCount").text(appointments.length);
    const idx = findNextAppointmentIndex();
    if (idx >= 0) {
      const ap = appointments[idx];
      const summary =
        ap.type + " on " + ap.date + " at " + ap.time + " (" + ap.location + ")";
      $("#homeNextAppt").text(summary);
      $("#heroNextAppt").text(summary);
    }
  }

  // 4. Interactive "How it works" step cards
  const stepDetails = {
    1: {
      title: "Step 1: Check your symptoms",
      text:
        "Use the assessment page to answer a few quick questions. If your answers suggest an emergency, " +
        "you will be guided towards urgent care services instead of booking a routine appointment.",
      link: "assessment.html",
      linkText: "Go to assessment"
    },
    2: {
      title: "Step 2: Compare local services",
      text:
        "On the services page, enter your location and radius to see nearby NHS services. " +
        "They are ordered by estimated waiting time so you can choose the fastest suitable option.",
      link: "services.html",
      linkText: "Find services"
    },
    3: {
      title: "Step 3: Book and manage appointments",
      text:
        "After choosing a service, you can book an appointment and store it on the appointments page. " +
        "You can edit details, add notes, and keep track of what is coming up next.",
      link: "appointment.html",
      linkText: "View appointments"
    }
  };

  $(".step-card").on("click", function () {
    $(".step-card").removeClass("active");
    $(this).addClass("active");

    const step = $(this).data("step");
    const detail = stepDetails[step];

    $("#stepDetailTitle").text(detail.title);
    $("#stepDetailText").text(detail.text);
    $("#stepDetailLink")
      .attr("href", detail.link)
      .text(detail.linkText);
  });
});
