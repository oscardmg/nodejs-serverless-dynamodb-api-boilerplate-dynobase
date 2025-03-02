// if (process.env.AWS_EXECUTION_ENV) {
//   return undefined;
// } else
export const getEndpoint = () => {
  if (process.env.DYNAMODB_ENDPOINT) {
    return `https://${process.env.DYNAMODB_ENDPOINT}`;
  } else {
    return "http://localhost:8000";
  }
};

export const getRegion = () => {
  if (process.env.REGION) {
    return process.env.REGION;
  } else if (process.env.AWS_DEFAULT_REGION) {
    return process.env.AWS_DEFAULT_REGION;
  } else {
    return "local";
  }
};

export default () => process.env.DATA_STORE_ARN.split("/").slice(-1)[0];
