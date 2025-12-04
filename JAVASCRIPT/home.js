// ../JAVASCRIPT/home.js

$(function () {
  // ---------- TODAY'S DATE (if element exists) ----------
  const today = new Date();
  const $todayDate = $("#todayDate");

  if ($todayDate.length) {
    $todayDate.text(
      today.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }

  // ---------- LOGIN STATE MESSAGE ----------
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const $welcomeMessage = $("#welcomeMessage");

  if ($welcomeMessage.length) {
    $welcomeMessage.text(
      isLoggedIn
        ? "You are signed in. View and update your appointments anytime."
        : "You are not signed in yet. Log in to save and manage your appointments."
    );
  }

  // ---------- APPOINTMENTS & NEXT APPOINTMENT ----------
  let appointments = [];
  try {
    const raw = localStorage.getItem("appointments");
    appointments = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(appointments)) appointments = [];
  } catch {
    appointments = [];
  }

  let nextAppt = null;
  if (appointments.length) {
    const now = new Date();

    const withDates = appointments
      .map((a) => {
        const timePart = a.time ? a.time : "12:00";
        return {
          ...a,
          when: new Date(`${a.date}T${timePart}`),
        };
      })
      .filter((a) => !isNaN(a.when.getTime()) && a.when >= now)
      .sort((a, b) => a.when - b.when);

    if (withDates.length) nextAppt = withDates[0];
  }

  const summary = nextAppt
    ? `${nextAppt.type} on ${nextAppt.date} at ${nextAppt.time} (${nextAppt.location})`
    : "No upcoming appointments saved.";

  const $heroNextAppt = $("#heroNextAppt");
  if ($heroNextAppt.length) $heroNextAppt.text(summary);

  const $homeNextAppt = $("#homeNextAppt");
  if ($homeNextAppt.length) $homeNextAppt.text(summary);

  const $homeApptCount = $("#homeApptCount");
  if ($homeApptCount.length) $homeApptCount.text(appointments.length);

  // ---------- HOW IT WORKS – STEP CARDS ----------
  const steps = {
    1: {
      title: "Step 1: Check symptoms",
      text:
        "Use the symptom check to answer quick questions about how you’re feeling and whether you might need urgent or routine care.",
      link: "assessment.html",
      linkText: "Go to symptom check",
    },
    2: {
      title: "Step 2: Compare local services",
      text:
        "Enter your area to see nearby NHS services sorted by distance and typical waiting times, then choose what suits you best.",
      link: "services.html",
      linkText: "Browse services",
    },
    3: {
      title: "Step 3: Manage appointments",
      text:
        "Save your appointment details so you always know when and where you’re being seen, and update them as things change.",
      link: "appointment.html",
      linkText: "Open my appointments",
    },
  };

  $(".step-card").on("click", function () {
    $(".step-card").removeClass("active");
    $(this).addClass("active");

    const s = steps[$(this).data("step")];
    if (!s) return;

    $("#stepDetailTitle").text(s.title);
    $("#stepDetailText").text(s.text);
    $("#stepDetailLink").attr("href", s.link).text(s.linkText);
  });
});
