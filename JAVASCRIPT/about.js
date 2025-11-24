// about.js
$(document).ready(function () {
  const yearSpan = $("#aboutYear");
  const year = new Date().getFullYear();
  yearSpan.text(year);
});
