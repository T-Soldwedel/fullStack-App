import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/ordersController.js";
import { isAdmin } from "../middlewares/isAdminMiddleware.js";
import verifyToken from "../middlewares/verifyToken.js";

const route = express.Router();

// Route GET "/orders"
route.get("/", verifyToken, isAdmin, getAllOrders);

// Route GET "/orders/:id"
route.get("/:id", verifyToken, getSingleOrder);

// Route POST "/orders"
route.post("/", verifyToken, createOrder);

// Route PATCH "/orders"
route.patch("/:id", verifyToken, updateOrder);

// Route DELETE "/orders"
route.delete("/:id", verifyToken, deleteOrder);

export default route;
