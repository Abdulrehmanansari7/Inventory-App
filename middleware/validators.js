import { body, param, validationResult } from "express-validator";

// Runs the checks, and if any fail, sends the request straight to the error page.
const rejectInvalid = (checks) => [
  ...checks,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      err.status = 400;
      return next(err);
    }
    next();
  },
];

// /company/:id, /form/:id, /delete/:id ...
export const validateId = rejectInvalid([
  param("id").isInt({ min: 1 }).withMessage("Invalid id in the URL"),
]);

// hidden companyId field in the car search form
export const validateCompanyIdBody = rejectInvalid([
  body("companyId").isInt({ min: 1 }).withMessage("Invalid company id"),
]);

// Add car form. Failures are shown on the form itself (the controller checks validationResult).
export const validateCar = [
  body("model")
    .trim()
    .notEmpty().withMessage("Model is required")
    .isLength({ max: 100 }).withMessage("Model must be 100 characters or less"),
  body("year")
    .trim()
    .notEmpty().withMessage("Year is required")
    .bail()
    .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
    .withMessage(`Year must be between 1886 and ${new Date().getFullYear() + 1}`),
  body("price")
    .trim()
    .notEmpty().withMessage("Price is required")
    .bail()
    .isFloat({ min: 0, max: 9999999999 })
    .withMessage("Price must be a number between 0 and 9,999,999,999"),
];

// Car search form: both boxes optional.
export const validateCarSearch = [
  body("minPrice")
    .optional({ values: "falsy" })
    .isFloat({ min: 0 }).withMessage("Minimum price must be a positive number"),
  body("maxPrice")
    .optional({ values: "falsy" })
    .isFloat({ min: 0 }).withMessage("Maximum price must be a positive number")
    .bail()
    .custom((max, { req }) => {
      const min = req.body.minPrice;
      if (min && Number(max) < Number(min)) {
        throw new Error("Maximum price cannot be lower than minimum price");
      }
      return true;
    }),
];

// Company search box on the home page.
export const validateCompanySearch = [
  body("search")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("Search must be 100 characters or less"),
];
