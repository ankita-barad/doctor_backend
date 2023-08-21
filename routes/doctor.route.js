const express = require("express");

const doctorRoute = express.Router();
const { DoctorModel } = require("../models/doctor.model");

doctorRoute.post("/doctors", async (req, res) => {
  try {
    const {
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    } = req.body;
    const newDoctor = new DoctorModel({
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });
    await newDoctor.save();
    res.status(200).send(newDoctor);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal error");
  }
});

doctorRoute.get("/get-doctors", async (req, res) => {
  try {
    const { filter, search } = req.query;
    // console.log(filter, search);
    let q = {};

    if (filter) {
      q.specialization = filter;
    }
    if (search) {
      q.name = { $regex: search, $options: "i" };
    }
    const doctors = await DoctorModel.find(q);
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal error");
  }
});

doctorRoute.delete("/delete-doctoc/:id", async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndDelete(req.params.id);
    res.status(200).send(doctor);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal error");
  }
});

module.exports = { doctorRoute };
