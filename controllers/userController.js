import { validationResult, matchedData } from "express-validator";
import db from "../db/queries.js";

const getCompany = async (req, res) => {
  const companies = await db.getCompany();
  res.render("index", { title: "Companies", companies });
};

const searchCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const companies = await db.getCompany();
    return res.status(400).render("index", {
      title: "Companies",
      companies,
      errors: errors.array(),
      search: req.body.search,
    });
  }

  const { search } = matchedData(req, { locations: ["body"] });
  const companies = await db.searchCompany(search);
  res.render("index", { title: "Companies", companies, search });
};

const getCars = async (req, res) => {
  const { id } = req.params;
  const carsModel = await db.getCars(id);
  res.render("cars", { title: "Cars", carsModel, companyId: id });
};

const carForm = (req, res) => {
  res.render("form", { id: req.params.id });
};

const submitCar = async (req, res) => {
  console.log(validationResult(req).array());
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      id,
      errors: errors.array(),
      old: req.body,
    });
  }

  const { model, year, price } = matchedData(req, { locations: ["body"] });
  const newCar = await db.submitCar(model, year, price, id);
  res.redirect(`/company/${newCar[0].company_id}`);
};

const deleteCar = async (req, res) => {
  const companyId = await db.deleteCar(req.params.id);
  if (!companyId) {
    const err = new Error("Car not found");
    err.status = 404;
    throw err;
  }
  res.redirect(`/company/${companyId}`);
};

const searchCar = async (req, res) => {
  const { companyId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const carsModel = await db.getCars(companyId);
    return res.status(400).render("cars", {
      title: "Cars",
      carsModel,
      companyId,
      errors: errors.array(),
      old: req.body,
    });
  }

  const { minPrice, maxPrice } = matchedData(req, { locations: ["body"] });
  const carsModel = await db.searchCar(companyId, minPrice, maxPrice);
  res.render("cars", { title: "Cars", carsModel, companyId, old: req.body });
};

export default {
  getCompany,
  getCars,
  carForm,
  submitCar,
  deleteCar,
  searchCar,
  searchCompany,
};
