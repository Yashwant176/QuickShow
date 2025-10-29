import express from "express";
import { requireAuth } from "@clerk/express";
import { getFavourites, getUserBookings, updateFavourite } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/bookings", requireAuth(), getUserBookings); // ✅ must protect this route
userRouter.post("/update-favourite", requireAuth(), updateFavourite);
userRouter.post("/favourites", requireAuth(), getFavourites);

export default userRouter;