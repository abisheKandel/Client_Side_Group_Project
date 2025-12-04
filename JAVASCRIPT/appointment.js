$(document).ready(function () {

    // LOGIN CHECK
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!loggedIn) {
        $("#loginRequiredPanel").removeClass("d-none");
        $("#appointmentContent").addClass("d-none");
        return;
    } else {
        $("#loginRequiredPanel").addClass("d-none");
        $("#appointmentContent").removeClass("d-none");
    }

    // FIXED: GUARANTEED WORKING LOGOUT
    $(document).on("click", "#logoutBtn", function () {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "login.html";
    });

    // Load appointments
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const listContainer = $("#appointmentsList");

    function getNextIndex() {
        if (appointments.length === 0) return -1;
        let next = 0;
        let nextDate = new Date(appointments[0].date + "T" + appointments[0].time);

        for (let i = 1; i < appointments.length; i++) {
            const d = new Date(appointments[i].date + "T" + appointments[i].time);
            if (d < nextDate) {
                nextDate = d;
                next = i;
            }
        }
        return next;
    }

    function updateSummary() {
        const next = getNextIndex();
        $("#apptCount").text(appointments.length);

        if (next === -1) {
            $("#nextApptText").text("No appointments booked.");
            return;
        }

        const ap = appointments[next];
        $("#nextApptText").text(`${ap.type} on ${ap.date} at ${ap.time} (${ap.location})`);
    }

    function render() {
        listContainer.empty();
        const next = getNextIndex();

        appointments.forEach((ap, index) => {
            listContainer.append(`
                <div class="card appointment-card ${index === next ? "next-appointment" : ""}" data-index="${index}">
                  <div class="card-body">
                    <h5 class="card-title">${ap.type} ${index === next ? '<span class="badge bg-success">Next</span>' : ''}</h5>
                    <h6 class="text-muted">${ap.date} — ${ap.time}</h6>
                    <p>${ap.location}</p>
                    <p><strong>Notes:</strong> ${ap.notes || "—"}</p>

                    <button class="btn btn-sm btn-outline-primary edit-btn">Edit</button>
                    <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
                  </div>
                </div>
            `);
        });

        updateSummary();
    }

    render();

    // ADD / EDIT
    $("#addBtn").click(() => {
        $("#formTitle").text("Add appointment");
        $("#saveBtn").data("index", null);
        $("#appointmentFormWrapper").removeClass("d-none");
        $("#appointmentForm")[0].reset();
    });

    $("#cancelBtn").click(() => {
        $("#appointmentFormWrapper").addClass("d-none");
    });

    $("#saveBtn").click(() => {
        const index = $("#saveBtn").data("index");

        const ap = {
            type: $("#type").val().trim(),
            date: $("#date").val(),
            time: $("#time").val(),
            location: $("#location").val().trim(),
            notes: $("#notes").val().trim()
        };

        if (!ap.type || !ap.date || !ap.time || !ap.location) {
            alert("Please fill all required fields.");
            return;
        }

        if (index == null) {
            appointments.push(ap);
        } else {
            appointments[index] = ap;
        }

        localStorage.setItem("appointments", JSON.stringify(appointments));
        $("#appointmentFormWrapper").addClass("d-none");
        render();
    });

    $(document).on("click", ".edit-btn", function () {
        const index = $(this).closest(".appointment-card").data("index");
        const ap = appointments[index];

        $("#formTitle").text("Edit appointment");
        $("#type").val(ap.type);
        $("#date").val(ap.date);
        $("#time").val(ap.time);
        $("#location").val(ap.location);
        $("#notes").val(ap.notes);
        $("#saveBtn").data("index", index);

        $("#appointmentFormWrapper").removeClass("d-none");
    });

    $(document).on("click", ".delete-btn", function () {
        const index = $(this).closest(".appointment-card").data("index");

        if (confirm("Delete this appointment?")) {
            appointments.splice(index, 1);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            render();
        }
    });

});
