// contact.js
$(document).ready(function () {
  const $form = $("#contactForm");
  const $name = $("#contactName");
  const $email = $("#contactEmail");
  const $topic = $("#contactTopic");
  const $message = $("#contactMessage");
  const $alert = $("#contactAlert");

  function resetErrors() {
    $name.removeClass("is-invalid");
    $email.removeClass("is-invalid");
    $topic.removeClass("is-invalid");
    $message.removeClass("is-invalid");
  }

  function showAlert(type, text) {
    // type: 'success' or 'danger'
    $alert
      .removeClass("d-none alert-success alert-danger")
      .addClass("alert-" + type)
      .text(text);
  }

  $form.on("submit", function (e) {
    e.preventDefault();
    resetErrors();
    $alert.addClass("d-none");

    const nameVal = $name.val().trim();
    const emailVal = $email.val().trim();
    const topicVal = $topic.val();
    const messageVal = $message.val().trim();

    let valid = true;

    if (!nameVal) {
      $name.addClass("is-invalid");
      valid = false;
    }
    if (!emailVal || !emailVal.includes("@")) {
      $email.addClass("is-invalid");
      valid = false;
    }
    if (!topicVal) {
      $topic.addClass("is-invalid");
      valid = false;
    }
    if (!messageVal) {
      $message.addClass("is-invalid");
      valid = false;
    }

    if (!valid) {
      showAlert("danger", "Please correct the highlighted fields.");
      return;
    }

    // Store feedback locally for demo purposes
    const feedbackList = JSON.parse(localStorage.getItem("feedback") || "[]");
    feedbackList.push({
      name: nameVal,
      email: emailVal,
      topic: topicVal,
      message: messageVal,
      time: new Date().toISOString()
    });
    localStorage.setItem("feedback", JSON.stringify(feedbackList));

    showAlert("success", "Thank you for your feedback. It has been recorded for this prototype.");
    $form[0].reset();
  });
});
