"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProductHandler = exports.getHandler = void 0;
const db_functions_1 = require("./db-functions");
const error_handlers_1 = require("./error-handlers");
const product_helper_1 = require("./product-helper");
const getHandler = async (event, context) => {
    let response = {};
    try {
        let scanResults = await executeScan(db_functions_1.dynamoDbClient, product_helper_1.getProductScanParameters());
        let outputArray = [];
        if (scanResults === null || scanResults === void 0 ? void 0 : scanResults.Items) {
            for (let item of scanResults === null || scanResults === void 0 ? void 0 : scanResults.Items) {
                outputArray.push(product_helper_1.getProduct(item));
            }
        }
        console.log(`outputArray.length : ${outputArray.length}`);
        response = {
            'statusCode': 200,
            'body': JSON.stringify(outputArray),
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        };
    }
    catch (err) {
        console.log(err);
        return err;
    }
    return response;
};
exports.getHandler = getHandler;
async function executeScan(dynamoDbClient, scanInput) {
    // Call DynamoDB's scan API
    try {
        const scanOutput = await dynamoDbClient.scan(scanInput).promise();
        console.info('Scan successful.');
        // Handle scanOutput
        return scanOutput;
    }
    catch (err) {
        error_handlers_1.handleScanError(err);
    }
}
const getSingleProductHandler = async (event, context) => {
    let response = {};
    try {
        let productId = event.pathParameters.productId;
        console.log(`event.path : ${event.path}`);
        console.log(`event.pathParameters.productId : ${event.pathParameters.productId}`);
        // event.queryStringParameters = {"name":"test"}
        let scanResults = await executeScan(db_functions_1.dynamoDbClient, product_helper_1.getProductScanParameters(productId));
        let outputProduct = {};
        if (scanResults === null || scanResults === void 0 ? void 0 : scanResults.Items) {
            for (let item of scanResults === null || scanResults === void 0 ? void 0 : scanResults.Items) {
                outputProduct = product_helper_1.getProduct(item);
            }
        }
        response = {
            'statusCode': 200,
            'body': JSON.stringify(outputProduct),
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        };
    }
    catch (err) {
        console.log(err);
        return err;
    }
    return response;
};
exports.getSingleProductHandler = getSingleProductHandler;
