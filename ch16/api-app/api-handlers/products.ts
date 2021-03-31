// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
// let response;
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
    Context
} from 'aws-lambda';

import { dynamoDbClient } from "./db-functions";
import { handlePutItemError, handleScanError } from "./error-handlers";
import { IProduct } from './product-data';
import { getProduct, getProductScanParameters } from './product-helper';
export const getHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
) => {
    let response = {};
    try {

        let scanResults =
            await executeScan(
                dynamoDbClient,
                getProductScanParameters()
            );
        let outputArray = []

        if (scanResults?.Items) {
            for (let item of scanResults?.Items) {
                outputArray.push(getProduct(item));

            }
        }

        console.log(`outputArray.length : ${outputArray.length}`);
        response = {
            'statusCode': 200,
            'body': JSON.stringify(outputArray),
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};

async function executeScan(dynamoDbClient: AWS.DynamoDB, scanInput: AWS.DynamoDB.ScanInput) {
    // Call DynamoDB's scan API
    try {
        const scanOutput = await dynamoDbClient.scan(scanInput).promise();
        console.info('Scan successful.');
        // Handle scanOutput
        return scanOutput;
    } catch (err) {
        handleScanError(err);
    }
}


export const getSingleProductHandler = async (event: APIGatewayProxyEvent, context: Context) => {
    let response = {};

    try {

        let productId = (<any>event.pathParameters).productId;

        console.log(`event.path : ${event.path}`);
        console.log(`event.pathParameters.productId : ${(<any>event.pathParameters).productId}`);

        // event.queryStringParameters = {"name":"test"}

        let scanResults = await executeScan(
            dynamoDbClient,
            getProductScanParameters(productId)
        );
        let outputProduct = {};

        if (scanResults?.Items) {
            for (let item of scanResults?.Items) {
                outputProduct = getProduct(item);
            }
        }

        response = {
            'statusCode': 200,
            'body': JSON.stringify(outputProduct),
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};