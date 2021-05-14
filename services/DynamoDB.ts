// import * as AWSXRay from 'aws-xray-sdk';
import { DynamoDB } from 'aws-sdk';
import { getEndpoint, getRegion } from '../utils/consts';
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";


const endpoint = getEndpoint();
const region = getRegion();

// console.log('process.env.AWS_EXECUTION_ENV: ', process.env.AWS_EXECUTION_ENV);
// console.log('process.env.DYNAMODB_ENDPOINT: ', process.env.DYNAMODB_ENDPOINT);
// console.log('process.env.REGION: ', process.env.REGION);
// console.log('process.env.AWS_DEFAULT_REGION: ', process.env.AWS_DEFAULT_REGION);
// console.log('Region: ', region);
// console.log('Endpoint: ', endpoint);

const params = {
  endpoint: endpoint,
  region: region
};


export const documentClient = new DynamoDB.DocumentClient({
  service: new DynamoDB(params)
});

export const dynamoDBClient = new DynamoDBClient(params);



//// Capture X-Ray traces only on AWS Lambda
// if (process.env.AWS_EXECUTION_ENV) {
//   AWSXRay.captureAWSClient((documentClient as any).service);
// }
