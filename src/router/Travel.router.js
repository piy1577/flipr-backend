import { Router } from "express";
import { countryNames, flight, hotel, hotelById } from "./Travel.controller.js";

const travelRouter = Router();

travelRouter.get("/country", countryNames);
travelRouter.get("/flight", flight);
travelRouter.post("/hotel", hotel);
travelRouter.get("/hotel/:id", hotelById);
export default travelRouter;
