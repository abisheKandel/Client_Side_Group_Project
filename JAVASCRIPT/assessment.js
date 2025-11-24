// assessment.js
$(document).ready(function () {

  const $form = $("#assessmentForm");
  const $mainSymptom = $("#mainSymptom");
  const $duration = $("#duration");

  const $resultUrgent = $("#resultUrgent");
  const $resultRoutine = $("#resultRoutine");
  const $resultInfo = $("#resultInfo");

  function showUrgent() {
    $resultInfo.addClass("d-none");
    $resultRoutine.addClass("d-none");
    $resultUrgent.removeClass("d-none");

    // store outcome (optional, other pages can read this)
    localStorage.setItem("assessmentOutcome", "urgent");
  }

  function showRoutine() {
    $resultInfo.addClass("d-none");
    $resultUrgent.addClass("d-none");
    $resultRoutine.removeClass("d-none");

    localStorage.setItem("assessmentOutcome", "routine");
  }

  function resetErrors() {
    $mainSymptom.removeClass("is-invalid");
    $duration.removeClass("is-invalid");
  }

  $form.on("submit", function (e) {
    e.preventDefault();

    resetErrors();

    const mainSymptomVal = $mainSymptom.val();
    const durationVal = $duration.val();

    let valid = true;

    if (!mainSymptomVal) {
      $mainSymptom.addClass("is-invalid");
      valid = false;
    }
    if (!durationVal) {
      $duration.addClass("is-invalid");
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Check for any red-flag checkbox ticked
    let hasRedFlag = false;
    $(".red-flag").each(function () {
      if ($(this).is(":checked")) {
        hasRedFlag = true;
      }
    });

    // If any red-flag is present → urgent
    if (hasRedFlag) {
      showUrgent();
      return;
    }

    // Simple extra rule: some main symptoms with very short duration may also be more urgent
    // This is just a basic condition for your prototype.
    if ((mainSymptomVal === "chest" || mainSymptomVal === "breathing") && durationVal === "hours") {
      showUrgent();
      return;
    }

    // Otherwise treat as suitable for routine care
    showRoutine();
  });

});
