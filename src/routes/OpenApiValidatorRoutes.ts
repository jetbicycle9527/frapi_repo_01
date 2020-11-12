import * as express from "express";
// import OpenApiValidator from "express-openapi-validator";
const OpenApiValidator = require('express-openapi-validator');
import path from "path";


export class OpenApiValidatorRoutes {

    public static register(app: express.Application) {
        const spec = path.join(__dirname, 'openapi.yaml');
        app.use('/spec', express.static(spec));
        app.use(
            OpenApiValidator.middleware({
                apiSpec: './swagger/openapi.yaml',
                validateRequests: true, // (default)
                validateResponses: true, // false by default
            }),
        );
        app.use((err, req, res, next) => {
            // format error
            res.status(err.status || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });

    }
}

