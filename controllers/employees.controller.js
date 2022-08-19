const asyncHandler = require("express-async-handler");
let Employee = require("../models/employee.model");
// import express, { Request, Response, NextFunction } from "express";

const getEmployees = asyncHandler(async (req, res) => {
  try {
    const { name } = req.query;
    const employee = await Employee.find({
      name: new RegExp(name),
    });
    res.status(200).json({ success: true, employee });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});

module.exports = { getEmployees };
