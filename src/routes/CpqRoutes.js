Object.defineProperty(exports, "__esModule", { value: true });
exports.CpqRoutes = void 0;
const QuoteHandler_1 = require("../controllers/QuoteHandler");
class CpqRoutes {
    static register(app) {
        // const oidc = app.locals.oidc;
        // define a route handler for the default home page
        app.get("/v1/api/quote/:quoteId", QuoteHandler_1.QuoteHandlers.getQuoteDetails);
        app.post("/v1/api/quote", QuoteHandler_1.QuoteHandlers.createQuote);
        app.use('/v1/ping', (req, res) => res.status(200).send('pong'));
        app.get("/frapi/quote/:quoteId", QuoteHandler_1.QuoteHandlers.getQuoteDetails);
        app.post("/frapi/quote", QuoteHandler_1.QuoteHandlers.frapiCreateQuote);
        app.post("/frapi/quote/search", QuoteHandler_1.QuoteHandlers.searchQuote);
    }
}
exports.CpqRoutes = CpqRoutes;
//# sourceMappingURL=CpqRoutes.js.map