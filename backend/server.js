const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Get all doctors
app.get("/api/doctors", (req, res) => {
  fs.readFile("./doctors.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error loading doctors");
    res.json(JSON.parse(data));
  });
});

// Get doctor by ID
app.get("/api/doctors/:id", (req, res) => {
  fs.readFile("./doctors.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error loading doctors");
    const doctors = JSON.parse(data);
    const doctor = doctors.find(d => d.id === req.params.id);
    if (!doctor) return res.status(404).send("Doctor not found");
    res.json(doctor);
  });
});


app.post("/api/appointments", (req, res) => {
  console.log("New booking:", req.body);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
