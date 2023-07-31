import { Router } from "express";
import { countryNames, hotel, hotelById } from "./Travel.controller.js";

const travelRouter = Router();

travelRouter.get("/country", countryNames);
travelRouter.post("/hotel", hotel);
travelRouter.get("/hotel/:id", hotelById);
export default travelRouter;
