import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as winston from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');


/**
 * Call CPE to get the configuration that will meet the desired input.
 */
export class FrapiLogger{

    /**
     * Method that get the logger instance
     * @param fileName
     * @param label
     */
    public static getLogger(fileName: string, label: string): FrapiLogger {
        const ws: FrapiLogger = new FrapiLogger(fileName, label);
        const transports = ws.transports;
        ws.logger = winston.createLogger({ transports });
        FrapiLogger.loggerArray.push(ws.logger);
        FrapiLogger.loggerNames.push(fileName);
        return ws;
    }

    /**
     * Method that get the logger names that are controlled by the plugin log
     */
    public static getLogsNames(): string[] {
        return FrapiLogger.loggerNames;
    }

    private static loggerArray: winston.Logger[] = [];
    private static loggerNames: string[] = [];
    private static logConfiguration: any = require('../../../logConfiguration.json');
    private transports = [];
    private label: string;
    private logger: any;
  
    constructor(fileName: string, label: string) {
        this.label = label;
       this.transports.push(this.createRotatorStrategy(fileName));
    }
    /**
     * Method that show error log
     * @param message
     * @param prefix
     */
    public error(message: string, prefix?: string): void {
        this.logger.error(this.buildMessage(message, prefix));
    }
    /**
     * Method that show debug log
     * @param message
     * @param prefix
     */
    public warn(message: string, prefix?: string): void {
        this.logger.warn(this.buildMessage(message, prefix));
    }
    /**
     * Method that show info log
     * @param message
     * @param prefix
     */
    public info(message: string, prefix?: string): void {
        this.logger.info(this.buildMessage(message, prefix));
    }
    /**
     * Method that show verbose log
     * @param message
     * @param prefix
     */
    public verbose(message: string, prefix?: string): void {
        this.logger.verbose(this.buildMessage(message, prefix));
    }
    /**
     * Method that show debug log
     * @param message
     * @param prefix
     */
    public debug(message: string, prefix?: string): void {
        this.logger.debug(this.buildMessage(message, prefix));
    }
    /**
     * Method that show silly log
     * @param message
     * @param prefix
     */
    public silly(message: string, prefix?: string): void {
        this.logger.silly(this.buildMessage(message, prefix));
    }

    /**
     * Create the Rotator Strategy
     * @param fileName
     */
    private createRotatorStrategy(fileName: string): DailyRotateFile {
        const path = join(__dirname, '../../logs/');
        if (!existsSync(path)) {
            mkdirSync(join(__dirname, '../../logs/'));
        }
        fileName = join(__dirname, '../../logs/' + fileName);
        fileName = fileName + '-%DATE%.log';
        return new (DailyRotateFile)({
            filename: fileName,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: false,
            maxSize: FrapiLogger.logConfiguration.FileMaxSize,
            maxFiles: FrapiLogger.logConfiguration.FileMaxFiles,
            level: FrapiLogger.logConfiguration.LogLevel,
        });
    }
    /**
     * Method that build the message
     * @param message
     * @param prefix
     */
    private buildMessage(message: string, prefix?: string): string {
        let finalMessage: string = message;
        if (!prefix) {
            prefix = this.label;
        }
        finalMessage = '[' + prefix + '] ' + finalMessage;
        return finalMessage;
    }
    /**
     * Method that creates the Console log format
     * @param label
     */
   

    public getTransactionId(pluginId: string) {
        return pluginId + ':' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
}
