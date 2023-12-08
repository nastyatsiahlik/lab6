const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { ReportModel } = require("./database");

app.use(bodyParser.json());

app.post("/reports", async (req, res) => {
  try {
    const report = new ReportModel(req.body);
    await report.save();
    res.status(201).send(report);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/reports", async (req, res) => {
  try {
    const reports = await ReportModel.find();
    res.send(reports);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/reports/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const report = await ReportModel.findById(id);
    if (!report) {
      return res.status(404).send("Report not found");
    }
    res.send(report);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/reports/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const report = await ReportModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!report) {
      return res.status(404).send("Report not found");
    }
    res.send(report);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/reports/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const report = await ReportModel.findByIdAndDelete(id);
    if (!report) {
      return res.status(404).send("Report not found");
    }
    res.send(report);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(8000, () => {
  console.log("Starting the server on port 8000");
});

module.exports = app;
