

$(document).ready(function () {

    // BLOCK PAGE IF NOT LOGGED IN
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
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

    // FUNCTION TO RENDER CARDS
    function renderAppointments() {
        listContainer.empty();
        appointments.forEach((ap, index) => {
            const card = `
                <div class="card" data-index="${index}">
                    <div class="card-title">${ap.type}</div>
                    <div>${ap.date} — ${ap.time}</div>
                    <div>${ap.location}</div>
                    <div>Notes: ${ap.notes || "—"}</div>

                    <div class="card-actions">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(card);
        });
    }

    renderAppointments();


    // --------------------
    // ADD APPOINTMENT FLOW
    // --------------------

    $("#addBtn").click(function () {
        $("#appointmentForm").slideDown();
        $("#saveBtn").data("edit-index", null);  // fresh form
    });

    $("#cancelBtn").click(function () {
        $("#appointmentForm").slideUp();
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

        if (editIndex === null) {
            // ADD new appointment
            const newId = "APPT-" + String(appointments.length + 1).padStart(4, '0');

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
        $("#appointmentForm").slideUp();
        $("#appointmentForm")[0].reset();
    });


    // -------------
    // EDIT + DELETE
    // -------------

    $(document).on("click", ".edit-btn", function () {
        const index = $(this).closest(".card").data("index");
        const ap = appointments[index];

        $("#type").val(ap.type);
        $("#date").val(ap.date);
        $("#time").val(ap.time);
        $("#location").val(ap.location);
        $("#notes").val(ap.notes);

        $("#saveBtn").data("edit-index", index);

        $("#appointmentForm").slideDown();
    });

    $(document).on("click", ".delete-btn", function () {
        const index = $(this).closest(".card").data("index");

        appointments.splice(index, 1);

        localStorage.setItem("appointments", JSON.stringify(appointments));
        renderAppointments();
    });

});
