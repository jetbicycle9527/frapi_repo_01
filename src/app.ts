import express from "express";
import { CpqRoutes } from "./routes/CpqRoutes";
import { OpenApiValidatorRoutes } from "./routes/OpenApiValidatorRoutes";
import Config from "./services/config";
const frapiConfig: any = Config.getConfig(Config.FRAPI);

const swaggerUi = require('swagger-ui-express');
//var swaggerDocument = require('./swagger/swagger.yaml');
var swaggerDocument = require('./swagger/openapi.json');

var compression = require('compression');



const app = express();
const port = process.env.PORT || frapiConfig.port;

app.use(compression());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded());
// parse incoming requests
app.use(express.json({ limit: '50mb' }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure routes
OpenApiValidatorRoutes.register(app);
CpqRoutes.register(app);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});