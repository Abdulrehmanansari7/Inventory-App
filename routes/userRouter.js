import userController from "../controllers/userController.js";
import express from "express";
import {
  validateId,
  validateCompanyIdBody,
  validateCar,
  validateCarSearch,
  validateCompanySearch,
} from "../middleware/validators.js";

const userRouter = express.Router();

userRouter.get("/", userController.getCompany);
userRouter.post("/searchCompany", validateCompanySearch, userController.searchCompany);
userRouter.get("/company/:id", validateId, userController.getCars);
userRouter.get("/form/:id", validateId, userController.carForm);
userRouter.post("/form/submitCar/:id", validateId, validateCar, userController.submitCar);
userRouter.post("/delete/:id", validateId, userController.deleteCar);
userRouter.post("/searchCar", validateCompanyIdBody, validateCarSearch, userController.searchCar);

export default userRouter;
