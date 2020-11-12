import * as express from "express";
import { QuoteHandlers } from "../controllers/QuoteHandler";


export class CpqRoutes {

    public static register(app: express.Application) {
        // const oidc = app.locals.oidc;
    
        // define a route handler for the default home page
        app.get("/v1/api/quote/:quoteId", QuoteHandlers.getQuoteDetails);
        app.post("/v1/api/quote", QuoteHandlers.createQuote);
        app.use('/v1/ping', (req, res) => res.status(200).send('pong'));

		app.get("/frapi/quote/:quoteId", QuoteHandlers.getQuoteDetails);
        app.post("/frapi/quote", QuoteHandlers.frapiCreateQuote);
        app.post("/frapi/quote/search", QuoteHandlers.searchQuote);
    }
}

