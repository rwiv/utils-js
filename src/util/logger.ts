import winston from "winston";
import chalk from "chalk";
import path from "path";
import {toPrettyDateString} from "../type/date.js";
import {assetPath} from "../file/path.js";

const logLevel = "info";
const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${chalk.gray(timestamp)} ${level}:${message}`;
});

const winstonLogger = winston.createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({
      level: logLevel,
      format: winston.format.combine(
        winston.format.colorize(), // log level별로 색상 적용
        winston.format.padLevels({
          levels: { error: 0, warn: 0, info: 0, debug: 0, silly: 0, }
        }),
        logFormat,
      ),
    }),
  ]
});

if (process.env.NODE_ENV === "prod") {
  const curFilename = toPrettyDateString(new Date()).replace(/:/gi, "-");
  const fileTransport = new winston.transports.File({
    filename: `${curFilename}.log`,
    dirname: path.resolve(assetPath(), "logs"),
    format: winston.format.combine(
      winston.format.padLevels({
        levels: { error: 0, warn: 0, info: 0, debug: 0, silly: 0, }
      }),
      printf(({ level, message, label, timestamp }) => {
        return `${timestamp} ${level}:${message}`;
      }),
    ),
  });
  winstonLogger.add(fileTransport);
}

/*
  error: 로그 찍고 앱 종료
  warn: 에러가 발생했으나 catch해서 넘어감
  info: 항상 보여야 하는 로그
  debug: 디버깅할때만 보는 로그
  silly: 테스트용으로 잠깐 찍는 로그
 */
class Logger {

  error(message: any) {
    winstonLogger.error(this.getMsg(message));
  }

  warn(message: any) {
    winstonLogger.warn(this.getMsg(message));
  }

  info(message: any) {
    winstonLogger.info(this.getMsg(message));
  }

  debug(message: any) {
    winstonLogger.debug(this.getMsg(message));
  }

  silly(message: any) {
    console.log(message);
  }

  private getMsg(message: any) {
    if (message instanceof Error) {
      return message.stack;
    }
    if (typeof message !== "string") {
      return JSON.stringify(message, null, 2);
    } else {
      return message;
    }
  }
}

export const logger = new Logger();
