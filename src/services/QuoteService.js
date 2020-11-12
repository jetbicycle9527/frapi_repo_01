var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const request_promise_1 = __importDefault(require("request-promise"));
// import _ = require('underscore');
class QuoteService {
    static sendRequest(urlSuffix, method, body, headers, hostBasicUrl, onResponse) {
        return request_promise_1.default({
            method,
            url: hostBasicUrl + urlSuffix,
            headers,
            json: body
        }, onResponse);
    }
    /*Common request to handle the getQuote API calls to CPQ server*/
    static getQuote(hostBasicUrl, quoteId, includeParam) {
        return new Promise((resolve, reject) => {
            if (!includeParam) {
                includeParam = "?include=specification,pricing,validation,candidate";
            }
            else {
                if (includeParam != "none") {
                    includeParam = "?include=" + includeParam;
                }
                else {
                    includeParam = "";
                }
            }
            this.sendRequest('/api/quotes/' + quoteId + includeParam, 'GET', {}, {}, hostBasicUrl, function (e, r, body) { }).then(result => {
                return resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    ;
}
module.exports = QuoteService;
//# sourceMappingURL=QuoteService.js.map