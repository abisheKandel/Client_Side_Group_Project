$(document).ready(function () {

  const form = $("#assessmentForm");

  const urgentBox = $("#resultUrgent");
  const appointBox = $("#resultAppointment");
  const routineBox = $("#resultRoutine");
  const infoBox = $("#resultInfo");

  const mainSymptom = $("#mainSymptom");
  const duration = $("#duration");
  const worsening = $("#worsening");

  function resetPanels() {
    urgentBox.addClass("d-none").removeClass("result-animate");
    appointBox.addClass("d-none").removeClass("result-animate");
    routineBox.addClass("d-none").removeClass("result-animate");
    infoBox.addClass("d-none").removeClass("result-animate");
  }

  function show(box) {
    resetPanels();
    box.removeClass("d-none");
    void box[0].offsetWidth;
    box.addClass("result-animate");
  }

  form.on("submit", function (e) {
    e.preventDefault();

    let valid = true;
    if (!mainSymptom.val()) { mainSymptom.addClass("is-invalid"); valid = false; }
    else mainSymptom.removeClass("is-invalid");

    if (!duration.val()) { duration.addClass("is-invalid"); valid = false; }
    else duration.removeClass("is-invalid");

    if (!valid) return;

    // Read symptom groups
    let hasSevere = false;
    $(".symptom-severe").each(function () {
      if ($(this).is(":checked")) hasSevere = true;
    });

    let hasMild = false;
    $(".symptom-mild").each(function () {
      if ($(this).is(":checked")) hasMild = true;
    });

    let hasHome = false;
    $(".symptom-home").each(function () {
      if ($(this).is(":checked")) hasHome = true;
    });

    const sym = mainSymptom.val();
    const wors = worsening.val();

    // URGENT CASES
    if (hasSevere || sym === "breathing" || sym === "chest" || (wors === "yes" && duration.val() !== "hours")) {
      show(urgentBox);
      return;
    }

    // NORMAL GP APPOINTMENT
    if (hasMild || sym === "injury" || duration.val() === "week" || duration.val() === "long") {
      show(appointBox);
      return;
    }

    // SELF-CARE
    if (hasHome || (sym === "mild" && duration.val() === "hours")) {
      show(routineBox);
      return;
    }

    // DEFAULT → appointment
    show(appointBox);
  });

});
