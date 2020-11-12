const config = require('config');

class Config {
  public static REDIS = "redis";
  public static CPQ = "cpq";
  public static FRAPI = "frapi";

  public static getConfig(type: string) {
    return config[type];
  }
}

export = Config
