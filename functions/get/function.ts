import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

import { httpResponse } from "../../utils/responses";
import {documentClient, dynamoDBClient} from "../../services/DynamoDB";
import {getController, getControllerV3} from "./controller";

export const handle: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const result = await getController(event, documentClient);
    return httpResponse(result);
  } catch (error) {
    console.error(error);
    return httpResponse("Bad Request", 400);
  }
};

export const handleV3: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const result = await getControllerV3(event, dynamoDBClient);
    return httpResponse(result);
  } catch (error) {
    console.error(error);
    return httpResponse("Bad Request", 400);
  }
};