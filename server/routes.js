import { isAuth } from "./middlewares/auth.js";
import reportsAPI from './src/api-reports/reports.api.js';
import storageAPI from './src/api-storage/storage.api.js';
import healthcheckAPI from './src/api-healthcheck/users.api.js';
import authenticationAPI from './src/api-authentication/authentication.api.js';
import sendEmailApi from "./src/api-send-email/send-email.api.js";

const routes = (app) => {
  app.use('/almacenamiento', storageAPI);
  app.use('/healthcheck', healthcheckAPI);
  app.use('/reportes', isAuth, reportsAPI);
  app.use('/v1/autenticar', authenticationAPI);
  app.use('/v1/contact/send-email', sendEmailApi);
};

export default routes;
