const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require("lodash");

const { ReportModel } = require("./database");

const app = require("./index");
console.log(app, "app");
const { report, differentReport } = require("./constants");

const reportKeys = Object.keys(report); //что тут

chai.use(chaiHttp);
const expect = chai.expect;

describe("Post", () => {
  it("Should create a new report", async () => {
    new ReportModel(report);
    console.log(await ReportModel.find());

    const res = await chai.request(app).post("/reports").send(report);

    console.log("Response:", res.error);
    console.log("Body:", res.body);

    expect(res).to.have.status(201);
    expect(_.pick(res.body, reportKeys)).to.deep.equal(report);
  });
});

describe("Get", () => {
  before(async () => {
    const response = await chai.request(app).post("/reports").send(report);

    createdReport = response.body;
  });

  it("Should get all reports", async () => {
    const res = await chai.request(app).get("/reports");

    expect(res.body).to.be.an("array");
    expect(res.body.some((report) => report._id === createdReport._id)).to.be
      .true;
  });

  it("Should get one report by id", async () => {
    const res = await chai.request(app).get(`/reports/${createdReport._id}`);

    expect(res.body).to.deep.equal(createdReport);
  });
});

describe("Update", () => {
  before(async () => {
    const response = await chai.request(app).post("/reports").send(report);

    createdReport = response.body;
  });

  it("Should update(put) report by id", async () => {
    const res = await chai
      .request(app)
      .put(`/reports/${createdReport._id}`)
      .send(differentReport);

    expect(res.body).to.deep.equal({ ...createdReport, ...differentReport });
  });
});

describe("Delete", () => {
  before(async () => {
    const response = await chai.request(app).post("/reports").send(report);

    createdReport = response.body;
  });

  it("Should delete report by id", async () => {
    const res = await chai.request(app).delete(`/reports/${createdReport._id}`);

    expect(res.body).to.deep.equal(createdReport);
  });
});
