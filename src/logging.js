const log = require("electron-log");

export function sillyLogger(str) {
  log.silly(str);
}

export function debugLogger(str) {
  log.debug(str);
}

export function verboseLogger(str) {
  log.verbose(str);
}

export function infoLogger(str) {
  log.info(str);
}

export function warnLogger(str) {
  log.warn(str);
}

export function errorLogger(str) {
  log.error(str);
}

export function getFilePath() {
  const logPath = log.transports.file.getFile();
  return logPath.path;
}