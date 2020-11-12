var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiValidatorRoutes = void 0;
const express = __importStar(require("express"));
// import OpenApiValidator from "express-openapi-validator";
const OpenApiValidator = require('express-openapi-validator');
const path_1 = __importDefault(require("path"));
class OpenApiValidatorRoutes {
    static register(app) {
        const spec = path_1.default.join(__dirname, 'openapi.yaml');
		console.log("location for validation spec is: "+spec);
        app.use('/spec', express.static(spec));
        app.use(OpenApiValidator.middleware({
            apiSpec: spec,
            validateRequests: true,
            validateResponses: true,
        }));
        app.use((err, req, res, next) => {
            // format error
            res.status(err.status || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });
    }
}
exports.OpenApiValidatorRoutes = OpenApiValidatorRoutes;
//# sourceMappingURL=OpenApiValidatorRoutes.js.map