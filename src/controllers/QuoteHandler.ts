import Config from "../services/config";
import QuoteService from "../services/QuoteService";
const FrapiLogger = require('../services/FrapiLogger')
const Redis = require("ioredis");
const redisConfig: any = Config.getConfig(Config.REDIS);

const cpqConfig: any = Config.getConfig(Config.CPQ);
const redis = new Redis(redisConfig);
const cpqHostPort = cpqConfig.host + ":" + cpqConfig.port;
var logger = FrapiLogger.FrapiLogger.getLogger("QuoteHandler", "QuoteHandler");
export class QuoteHandlers {

  constructor() {
  }
  

  public static getQuoteDetails(req: any, res: any, next: any) {

    const hostBasicUrl = req.protocol + '://' + cpqHostPort;
    var quoteId = req.params['quoteId'];
    redis.get(quoteId, function (err, data) {
      if (data != null) {
        res.status(200).send(JSON.parse(data));
      }
      else {
        QuoteService.getQuote(hostBasicUrl, quoteId, 'candidate,pricing')
          .then((quoteResponse: any) => {
            redis.set(quoteId, JSON.stringify(quoteResponse));
            res.status(200).send(quoteResponse);
          }).catch((err) => {
            res.status(500).send(err);
          });
      }
    });
  }

  public static searchQuote(req: any, res: any, next: any) {

    let returnedQuoteList = [
      {
        id:"fb7d7fc2-b325-4051-ad05-81ad4c1b9b57"
      }
    ];
    
        res.status(200).send(returnedQuoteList);
     
  }
  
  public static createQuote(req: any, res: any, next: any) {

    //As of now hardcoded need to configure dynamically via configuration json

    const hostBasicUrl = req.protocol + '://' + cpqHostPort;
    var body = req.body;
    let quoteId:string="";
    //create Quote Operation following the getQuote and setting up the cache with quoteID as a key
    QuoteService.sendRequest('/api/quotes', 'POST', body, {}, hostBasicUrl, (e, r, body) => { })
      .then(response => {
        if (response && response.id) {
          quoteId = response.id;
         redis.get(quoteId, function (err, data) {
            if (data != null) {
             var errorMessage="QuoteID exists and cannot be created";
             res.status(500).send(errorMessage);
            }
            else {
              redis.set(quoteId, JSON.stringify(response));
              return res.status(200).send(response);
            }
          })
        }
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });


  }
  
    public static frapiCreateQuote(req: any, res: any, next: any) {

    //As of now hardcoded need to configure dynamically via configuration json
    const hostBasicUrl = req.protocol + '://' + cpqHostPort;
    var body = {contextData:req.body};
    var quoteId = "";
    const transactionId: string = logger.getTransactionId('QuoteHandler');
    //create Quote Operation following the getQuote and setting up the cache with quoteID as a key
    QuoteService.sendRequest('/api/quotes', 'POST', body, {}, hostBasicUrl, (e, r, body) => { })
      .then(response => {
        if (response && response.id) {
          quoteId = response.id;
          logger.info('createQuote method  success', transactionId);
          redis.get(quoteId, function (err, data) {
            if (data != null) {
             var errorMessage="QuoteID exists and cannot be created";
             logger.error(errorMessage, transactionId);
             res.status(500).send(errorMessage);
            }
            else {
              redis.set(quoteId, JSON.stringify(response));
              logger.info('redisSet  successful', transactionId);
              return res.status(200).send(response);
            }
          })
        }
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });


  }



}

