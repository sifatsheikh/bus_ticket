document.addEventListener("DOMContentLoaded", () => {
  const districts = [
    "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria",
    "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka",
    "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj",
    "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat",
    "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
    "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar",
    "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
    "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh",
    "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
    "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet",
    "Tangail", "Thakurgaon"
  ];

  const startPoint = document.getElementById("startPoint");
  const endPoint = document.getElementById("endPoint");

  // Populate districts
  districts.forEach(district => {
    const option1 = new Option(district, district);
    const option2 = new Option(district, district);
    startPoint.add(option1);
    endPoint.add(option2);
  });

  const seatContainer = document.getElementById("seatContainer");

  // Generate seat options
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  for (let row of rows) {
    for (let i = 1; i <= 2; i++) {
      const seat = document.createElement("div");
      seat.className = "seat";
      seat.textContent = `${row}${i}`;

      seat.addEventListener("click", () => {
        seat.classList.toggle("selected");
      });

      seatContainer.appendChild(seat);
    }
  }

  // Generate PDF ticket
  // Generate PDF ticket
document.getElementById("generateTicket").addEventListener("click", () => {
  const passengerName = document.getElementById("passengerName").value;
  const phoneNumber = document.getElementById("phoneNumber").value || "N/A";
  const startPointValue = document.getElementById("startPoint").value;
  const endPointValue = document.getElementById("endPoint").value;
  const busName = document.getElementById("busName").value;
  const farePerSeat = document.getElementById("fare").value;

  const selectedSeats = Array.from(
    document.querySelectorAll(".seat.selected")
  ).map(seat => seat.textContent);

  if (!passengerName || !startPointValue || !endPointValue || !busName || !farePerSeat || selectedSeats.length === 0) {
    alert("Please fill all required fields and select at least one seat.");
    return;
  }

  const totalFare = selectedSeats.length * farePerSeat;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "landscape", // Landscape orientation
    unit: "px",               // Units in pixels
    format: [230, 160]        // Custom dimensions: 200px width x 150px height
  });

  // Set golden color scheme
  doc.setFillColor(255, 215, 200);  // Golden background color
  doc.rect(0, 0, 230, 160, "F");  // Fill background
  doc.setFont("helvetica", "bold"); // Premium font
  doc.setFontSize(10);             // Adjust font size for new dimensions

  // Ticket layout using grid positions
  doc.setTextColor(0, 0, 0);        // Black text for details
  doc.text("BUS TICKET", 70, 20);

  doc.setTextColor(0, 0, 0);        // Black text for details
  doc.text(`Passenger Name: ${passengerName}`, 20, 50);
  doc.text(`Phone: ${phoneNumber}`, 20, 65);
  doc.text(`From: ${startPointValue}`, 20, 80);
  doc.text(`To: ${endPointValue}`, 20, 95);
  doc.text(`Bus Name: ${busName}`, 20, 110);
  doc.text(`Seats: ${selectedSeats.join(", ")}`, 20, 125);
  doc.text(`Total Fare: ${totalFare} BDT`, 20, 140);

  // Decorative golden border
  // doc.setDrawColor(218, 165, 62);  // Gold border color
  // doc.setLineWidth(2);             // Thicker border
  // doc.rect(5, 5, 190, 140);        // Ticket border

  // Save the ticket as a PDF
  doc.save("bus_ticket.pdf");
});


  // Payment Button Action
  document.getElementById("payNowBtn").addEventListener("click", () => {
    alert("Payment Process Initiated!");
  });
});