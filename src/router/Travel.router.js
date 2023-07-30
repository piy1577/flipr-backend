import { Router } from "express";
import { countryNames, flight } from "./Travel.controller.js";

const travelRouter = Router();

travelRouter.get("/country", countryNames);
travelRouter.get("/flight", flight);

export default travelRouter;
