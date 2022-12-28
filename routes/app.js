import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as appController from "../controllers/app";

const appRoutes = Router();

appRoutes.get("/api/bookings", isAuth, appController.getBookings);

appRoutes.get("/api/rideRequest", isAuth, appController.rideRequest);

appRoutes.get("/api/getNearbyCab", isAuth, appController.getNearbyCabs);

export default appRoutes;
