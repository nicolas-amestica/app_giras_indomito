import { isAuth } from "./middlewares/auth.js";
import zonesAPI from "./src/api-zones/zones.api.js";
import gradesAPI from "./src/api-grades/grades.api.js";
import regionAPI from './src/api-regions/regions.api.js';
import reportsAPI from './src/api-reports/reports.api.js';
import rentalsAPI from './src/api-rentals/rentals.api.js';
import housingAPI from './src/api-housing/housing.api.js';
import communeAPI from "./src/api-commune/commune.api.js";
import storageAPI from './src/api-storage/storage.api.js';
import provincesAPI from "./src/api-provinces/provinces.api.js";
import healthcheckAPI from './src/api-healthcheck/users.api.js';
import officialsAPI from './src/api-officials/officials.api.js';
import prefectureAPI from './src/api-prefectures/prefectures.api.js';
import propietariesAPI from "./src/api-propietaries/propietaries.api.js";
import propertyTypeAPI from "./src/api-property-type/property-type.api.js";
import conservationsAPI from "./src/api-conservations/conservations.api.js";
import authenticationAPI from './src/api-authentication/authentication.api.js';
import sendEmailApi from "./src/api-send-email/send-email.api.js";

const routes = (app) => {
  app.use('/almacenamiento', storageAPI);
  app.use('/healthcheck', healthcheckAPI);
  app.use('/reportes', isAuth, reportsAPI);
  app.use('/autenticar', authenticationAPI);
  app.use('/send-email', sendEmailApi);
};

export default routes;
