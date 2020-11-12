import http from "http";
import https from "https";
import rp, { RequestPromise } from "request-promise";
// import _ = require('underscore');
class QuoteService {


    public static sendRequest(urlSuffix: any, method: any, body: any, headers: any, hostBasicUrl: any, onResponse: any): RequestPromise<any> {
        return rp({
            method,
            url: hostBasicUrl + urlSuffix,
            headers,
            json: body
        }, onResponse);
    }

    /*Common request to handle the getQuote API calls to CPQ server*/

    public static getQuote(hostBasicUrl: any, quoteId: string, includeParam?: string) {
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
            this.sendRequest('/api/quotes/' + quoteId + includeParam, 'GET', {}, {}, hostBasicUrl, function (e, r, body) { }
            ).then(result => {
                return resolve(result);
            }).catch((error) => {

                reject(error);
            });
        });
    };

}

export = QuoteService;
