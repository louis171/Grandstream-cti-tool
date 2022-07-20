let retVal;
export const logError = async (severity, message) => {
  switch (severity) {
    case 0:
      retVal = await electron.log.silly(message);
      console.log(retVal);
      break;
    case 1:
      retVal = await electron.log.debug(message);
      console.log(retVal);
      break;
    case 2:
      retVal = await electron.log.verbose(message);
      console.log(retVal);
      break;
    case 3:
      retVal = await electron.log.info(message);
      console.log(retVal);
      break;
    case 4:
      retVal = await electron.log.warn(message);
      console.log(retVal);
      break;
    case 5:
      retVal = await electron.log.error(message);
      console.log(retVal);
      break;
    default:
      retVal = await electron.log.info(message);
      console.log(retVal);
      break;
  }
};

export const getLogPath = async () => {
  return await electron.log.getPath();
};
