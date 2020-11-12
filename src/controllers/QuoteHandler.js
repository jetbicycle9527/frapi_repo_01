var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteHandlers = void 0;
const QuoteService_1 = __importDefault(require("../services/QuoteService"));
const Redis = require("ioredis");
const redis = new Redis({
    host: 'epminfwwadv21.corp.pvt',
    port: 6380
});
const cpqHostPort = "epminfwwadv21.corp.pvt:9001";
class QuoteHandlers {
    constructor() {
    }
    static getQuoteDetails(req, res, next) {
        const hostBasicUrl = req.protocol + '://' + cpqHostPort;
        var quoteId = req.params['quoteId'];
        QuoteService_1.default.sendRequest('/api/quotes/' + quoteId, 'GET', {}, {}, hostBasicUrl, (e, r, body) => { })
            .then((quote) => {
            res.status(200).send(quote);
        })
            .catch((err) => {
            res.status(500).send(err);
        });
    }
    static searchQuote(req, res, next) {
        let returnedQuoteList = [
            {
                quoteId: "fb7d7fc2-b325-4051-ad05-81ad4c1b9b57"
            }
        ];
        res.status(200).send(returnedQuoteList);
    }
    static createQuote(req, res, next) {
        //As of now hardcoded need to configure dynamically via configuration json
        const hostBasicUrl = req.protocol + '://' + cpqHostPort;
        var body = req.body;
        let quoteId = '';
        //create Quote Operation following the getQuote and setting up the cache with quoteID as a key
        QuoteService_1.default.sendRequest('/api/quotes', 'POST', body, {}, hostBasicUrl, (e, r, body) => { })
            .then(response => {
            if (response && response.id) {
                quoteId = response.id;
                QuoteService_1.default.getQuote(hostBasicUrl, quoteId, 'candidate,pricing')
                    .then((quoteData) => {
                    redis.set(quoteId, quoteData.contextData);
                    return res.status(200).send(response);
                })
                    .catch((err) => {
                    res.status(500).send(err);
                });
            }
        })
            .catch((err) => {
            res.status(500).send(err);
        });
    }
    static frapiCreateQuote(req, res, next) {
        //As of now hardcoded need to configure dynamically via configuration json
        const hostBasicUrl = req.protocol + '://' + cpqHostPort;
        var body = { contextData: req.body };
        var quoteId = "";
        //create Quote Operation following the getQuote and setting up the cache with quoteID as a key
        QuoteService_1.default.sendRequest('/api/quotes', 'POST', body, {}, hostBasicUrl, (e, r, body) => { })
            .then(response => {
            if (response && response.id) {
                quoteId = response.id;
                QuoteService_1.default.getQuote(hostBasicUrl, quoteId, 'candidate,pricing')
                    .then((quoteData) => {
                    redis.set(quoteId, quoteData.contextData);
                    return res.status(200).send(response);
                })
                    .catch((err) => {
                    res.status(500).send(err);
                });
            }
        })
            .catch((err) => {
            res.status(500).send(err);
        });
    }
}
exports.QuoteHandlers = QuoteHandlers;
//# sourceMappingURL=QuoteHandler.js.map