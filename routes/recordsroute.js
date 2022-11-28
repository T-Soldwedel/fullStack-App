import express from "express";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getSingleRecord,
  updateRecord,
} from "../controllers/recordsController.js";
import { isAdmin } from "../middlewares/isAdminMiddleware.js";
import verifyToken from "../middlewares/verifyToken.js";

const route = express.Router();

// Route GET "/records"
route.get("/", getAllRecords);

// Route GET "/records/:id"
route.get("/:id", getSingleRecord);

// Route POST "/records"
route.post("/", verifyToken, isAdmin, createRecord);

// Route PATCH "/records"
route.patch("/:id", verifyToken, isAdmin, updateRecord);

// Route DELETE "/records"
route.delete("/:id", verifyToken, isAdmin, deleteRecord);

export default route;
