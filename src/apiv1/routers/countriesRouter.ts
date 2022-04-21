import { Router } from "express";
import countryCtl from "../controllers/countriesController";
import { ROUTE } from "./_const";
import _ from "../middlewares/fnHandler";

const cRoute = ROUTE.country;
const Country = Router();

Country.get(cRoute.get_provincials, _(countryCtl.getProvincials));
Country.get(cRoute.get_districts, _(countryCtl.getDistricts));
Country.get(cRoute.get_wards, _(countryCtl.getWards));

export default Country;
