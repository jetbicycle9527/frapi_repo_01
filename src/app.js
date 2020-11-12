var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CpqRoutes_1 = require("./routes/CpqRoutes");
const OpenApiValidatorRoutes_1 = require("./routes/OpenApiValidatorRoutes");
const swaggerUi = require('swagger-ui-express');
//var swaggerDocument = require('./swagger/swagger.yaml');
var swaggerDocument = require('./swagger/openapi.json');
var compression = require('compression');
const app = express_1.default();
const port = 8180; // default port to listen
app.use(compression());
// parse application/x-www-form-urlencoded
app.use(express_1.default.urlencoded());
// parse incoming requests
app.use(express_1.default.json({ limit: '50mb' }));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Configure routes
OpenApiValidatorRoutes_1.OpenApiValidatorRoutes.register(app);
CpqRoutes_1.CpqRoutes.register(app);
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map