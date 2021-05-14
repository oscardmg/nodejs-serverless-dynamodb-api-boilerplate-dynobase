import {APIGatewayProxyEvent} from "aws-lambda";
import {DynamoDB} from "aws-sdk";
import {DeviceUser} from "../../models/DeviceUser";
import {DynamoDBClient, QueryCommand} from "@aws-sdk/client-dynamodb";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";

export const getController = async (
    event: APIGatewayProxyEvent,
    documentClient: DynamoDB.DocumentClient
) => {

    const params = {
        TableName: 'DeviceUser',
        IndexName: 'DocumentNumber-index',
        KeyConditionExpression: '#documentNumber = :documentNumber',
        FilterExpression: '#documentType = :documentType and #deviceStatus = :deviceStatus',
        ExpressionAttributeNames: {
            '#documentType': 'DocumentType',
            '#documentNumber': 'DocumentNumber',
            '#deviceStatus': 'DeviceStatus'
        },
        ExpressionAttributeValues: {
            ':documentType': event.pathParameters.type,
            ':documentNumber': event.pathParameters.number,
            ':deviceStatus': 1
        }
    };

    const {Items} = await documentClient.query(params).promise();
    const item = Items[0] as DeviceUser;
    delete item.Fixture;
    return {item};
};

export const getControllerV3 = async (
    event: APIGatewayProxyEvent,
    dynamoDBClient: DynamoDBClient
) => {

    const params = {
        TableName: 'DeviceUser',
        IndexName: 'DocumentNumber-index',
        KeyConditionExpression: '#documentNumber = :documentNumber',
        FilterExpression: '#documentType = :documentType and #deviceStatus = :deviceStatus',
        ExpressionAttributeNames: {
            '#documentType': 'DocumentType',
            '#documentNumber': 'DocumentNumber',
            '#deviceStatus': 'DeviceStatus'
        },
        ExpressionAttributeValues: marshall({
            ':documentType': event.pathParameters.type,
            ':documentNumber': event.pathParameters.number,
            ':deviceStatus': 1
        })
    };

    const {Items} = await dynamoDBClient.send(new QueryCommand(params));
    const item = unmarshall(Items[0]) as DeviceUser;

    delete item.Fixture;
    return {item};
};
