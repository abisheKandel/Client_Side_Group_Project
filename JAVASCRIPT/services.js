// JAVASCRIPT/services.js
$(document).ready(function () {

  // OPTIONAL: block if not logged in (same pattern as appointment page)
  // Comment this out if you want services page to be public.
  // if (localStorage.getItem("isLoggedIn") !== "true") {
  //   window.location.href = "login.html";
  //   return;
  // }

  // Fake NHS provider dataset
  // distanceKm is from the user's rough area (for demo, static values)
  // waitDays is the estimated waiting time
  const providers = [
    {
      id: "P001",
      name: "Barking Medical Centre",
      type: "GP practice",
      distanceKm: 1.2,
      waitDays: 10,
      address: "23 High Street, Barking"
    },
    {
      id: "P002",
      name: "Royal London Hospital Outpatients",
      type: "Hospital outpatient clinic",
      distanceKm: 4.5,
      waitDays: 21,
      address: "Whitechapel Road, London"
    },
    {
      id: "P003",
      name: "Eastside Urgent Treatment Centre",
      type: "Urgent treatment centre",
      distanceKm: 3.0,
      waitDays: 2,
      address: "Dockside Road, London"
    },
    {
      id: "P004",
      name: "Thames View GP Surgery",
      type: "GP practice",
      distanceKm: 2.8,
      waitDays: 7,
      address: "Riverside Close, Barking"
    },
    {
      id: "P005",
      name: "City Walk-In Clinic",
      type: "Walk-in centre",
      distanceKm: 6.0,
      waitDays: 1,
      address: "Market Street, London"
    }
  ];

  const $servicesList = $("#servicesList");
  const $serviceCount = $("#serviceCount");
  const $bestServiceText = $("#bestServiceText");
  const $noResultsMessage = $("#noResultsMessage");

  // Render list of providers as cards
  function renderProviders(list) {
    $servicesList.empty();
    $noResultsMessage.addClass("d-none");
    $servicesList.removeClass("mt-3");

    if (!list || list.length === 0) {
      $serviceCount.text("0");
      $bestServiceText.text("No services in this radius.");
      $noResultsMessage.removeClass("d-none");
      return;
    }

    $serviceCount.text(list.length.toString());
    $servicesList.addClass("mt-3");

    list.forEach(function (p, index) {
      var recommendedBadge = "";
      var cardExtraClass = "";

      if (index === 0) {
        recommendedBadge =
          '<span class="badge bg-success ms-2">Shortest wait</span>';
        cardExtraClass = " recommended";
        $bestServiceText.text(
          p.name +
            " (" +
            p.type +
            "), " +
            p.distanceKm +
            " km away, approx. " +
            p.waitDays +
            " day(s) wait."
        );
      }

      var cardHtml =
        '<div class="card service-card' +
        cardExtraClass +
        '" data-provider-id="' +
        p.id +
        '">' +
        '<div class="card-body">' +
        '<h2 class="h5 card-title mb-1">' +
        p.name +
        recommendedBadge +
        "</h2>" +
        '<h6 class="card-subtitle mb-2 text-muted">' +
        p.type +
        "</h6>" +
        '<p class="card-text mb-1"><strong>Distance:</strong> ' +
        p.distanceKm +
        " km</p>" +
        '<p class="card-text mb-1"><strong>Estimated wait:</strong> ' +
        p.waitDays +
        " day(s)</p>" +
        '<p class="card-text mb-2"><strong>Address:</strong> ' +
        p.address +
        "</p>" +
        '<button class="btn btn-sm btn-primary book-btn">Book at this service</button>' +
        "</div>" +
        "</div>";

      $servicesList.append(cardHtml);
    });
  }

  // Filter + sort providers based on radius
  function findServices() {
    var radius = parseFloat($("#radiusSelect").val() || "5");
    // locationInput is not used in logic for now, but you can read it if needed
    var userLocation = $("#locationInput").val().trim();

    // Filter by radius
    var withinRadius = providers.filter(function (p) {
      return p.distanceKm <= radius;
    });

    // Sort by waitDays ascending (shortest wait first)
    withinRadius.sort(function (a, b) {
      return a.waitDays - b.waitDays;
    });

    renderProviders(withinRadius);
  }

  // Button click handler
  $("#findBtn").on("click", function () {
    findServices();
  });

  // Also run once on page load so it shows something by default
  findServices();

  // Handle click on "Book at this service"
  $(document).on("click", ".book-btn", function () {
    var providerId = $(this).closest(".service-card").data("provider-id");

    var selected = providers.find(function (p) {
      return p.id === providerId;
    });

    if (!selected) return;

    // Save to localStorage so appointment page can use it
    localStorage.setItem("selectedProvider", JSON.stringify(selected));

    // Redirect to appointment page
    window.location.href = "appointment.html";
  });
});
