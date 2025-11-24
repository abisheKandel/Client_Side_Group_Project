// JAVASCRIPT/appointment.js
$(document).ready(function () {

    // BLOCK PAGE IF NOT LOGGED IN
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // Read selected provider (if user came from Services page)
    const selectedProviderRaw = localStorage.getItem("selectedProvider");
    let selectedProvider = null;
    if (selectedProviderRaw) {
        try {
            selectedProvider = JSON.parse(selectedProviderRaw);
        } catch (e) {
            selectedProvider = null;
        }
    }

    // If we have a provider, show it in the top panel
    if (selectedProvider) {
        $("#providerNameText").text(selectedProvider.name + " – " + selectedProvider.type);
        $("#providerExtraText").text(
            selectedProvider.distanceKm + " km away · estimated wait " +
            selectedProvider.waitDays + " day(s)"
        );
        $("#selectedProviderPanel").removeClass("d-none");
    }

    // Load appointments or create sample ones
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    if (appointments.length === 0) {
        appointments = [
            {
                id: "APPT-0001",
                type: "GP Consultation",
                date: "2025-01-12",
                time: "09:30",
                location: "Barking Medical Centre",
                notes: "None"
            },
            {
                id: "APPT-0002",
                type: "Blood Test",
                date: "2025-01-20",
                time: "14:00",
                location: "Royal London Hospital",
                notes: "Bring NHS number"
            }
        ];
    }

    localStorage.setItem("appointments", JSON.stringify(appointments));

    const listContainer = $("#appointmentsList");

    // --------------------
    // HELPER: find next appointment index
    // --------------------
    function getNextAppointmentIndex() {
        if (appointments.length === 0) return -1;

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

    // --------------------
    // HELPER: update summary bar
    // --------------------
    function updateSummary(nextIndex) {
        $("#apptCount").text(appointments.length);

        if (appointments.length === 0 || nextIndex === -1) {
            $("#nextApptText").text("No appointments booked.");
            return;
        }

        const ap = appointments[nextIndex];
        $("#nextApptText").text(
            ap.type + " on " + ap.date + " at " + ap.time + " (" + ap.location + ")"
        );
    }

    // --------------------
    // RENDER CARDS
    // --------------------
    function renderAppointments() {
        listContainer.empty();

        const nextIndex = getNextAppointmentIndex();

        appointments.forEach((ap, index) => {
            const isNext = index === nextIndex;

            const nextBadge = isNext
                ? '<span class="badge bg-success next-badge">Next</span>'
                : "";

            const card = `
                <div class="card appointment-card ${isNext ? "next-appointment" : ""}" data-index="${index}">
                    <div class="card-body">
                        <h5 class="card-title mb-1">${ap.type}${nextBadge}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${ap.date} — ${ap.time}</h6>
                        <p class="card-text mb-1">${ap.location}</p>
                        <p class="card-text mb-2"><strong>Notes:</strong> ${ap.notes || "—"}</p>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary edit-btn">Edit</button>
                            <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            listContainer.append(card);
        });

        updateSummary(nextIndex);
    }

    renderAppointments();

    // --------------------
    // ADD / EDIT FLOW
    // --------------------
    $("#addBtn").click(function () {
        $("#appointmentFormWrapper").slideDown();
        $("#formTitle").text("Add appointment");
        $("#saveBtn").data("edit-index", null);
        $("#appointmentForm")[0].reset();

        // If we have a selected provider, pre-fill location and type
        if (selectedProvider) {
            $("#location").val(selectedProvider.name);
            if (!$("#type").val().trim()) {
                $("#type").val(selectedProvider.type);
            }
        }
    });

    $("#cancelBtn").click(function () {
        $("#appointmentFormWrapper").slideUp();
        $("#appointmentForm")[0].reset();
    });

    $("#saveBtn").click(function () {
        const type = $("#type").val().trim();
        const date = $("#date").val().trim();
        const time = $("#time").val().trim();
        const location = $("#location").val().trim();
        const notes = $("#notes").val().trim();

        if (!type || !date || !time || !location) {
            alert("Please fill all required fields.");
            return;
        }

        const editIndex = $(this).data("edit-index");

        if (editIndex === null || editIndex === undefined) {
            // ADD new appointment
            const newId = "APPT-" + String(appointments.length + 1).padStart(4, "0");

            const newAppointment = {
                id: newId,
                type,
                date,
                time,
                location,
                notes
            };

            appointments.unshift(newAppointment);
        } else {
            // EDIT existing
            appointments[editIndex] = {
                ...appointments[editIndex],
                type,
                date,
                time,
                location,
                notes
            };
        }

        localStorage.setItem("appointments", JSON.stringify(appointments));
        renderAppointments();
        $("#appointmentFormWrapper").slideUp();
        $("#appointmentForm")[0].reset();
    });

    // EDIT BUTTON
    $(document).on("click", ".edit-btn", function () {
        const index = $(this).closest(".appointment-card").data("index");
        const ap = appointments[index];

        $("#type").val(ap.type);
        $("#date").val(ap.date);
        $("#time").val(ap.time);
        $("#location").val(ap.location);
        $("#notes").val(ap.notes);

        $("#formTitle").text("Edit appointment");
        $("#saveBtn").data("edit-index", index);

        $("#appointmentFormWrapper").slideDown();
    });

    // DELETE BUTTON
    $(document).on("click", ".delete-btn", function () {
        const index = $(this).closest(".appointment-card").data("index");

        if (!confirm("Delete this appointment?")) {
            return;
        }

        appointments.splice(index, 1);

        localStorage.setItem("appointments", JSON.stringify(appointments));
        renderAppointments();
    });

});
