// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
    Context
} from 'aws-lambda';
import { createDynamoDbClient, dynamoDbClient } from './db-functions';
import { getProduct, getProductScanParameters } from './product-helper';
import { userExists } from './users';

interface IItem {
    productId: string;
    amount: number;
}

export const postHandler = async (event: APIGatewayProxyEvent, context: Context) => {
    let response = {};
    try {

        let bodyJson = JSON.parse(<string>event.body);
        let userId = (<any>event.pathParameters).userId;

        // let username: string = bodyJson.username;

        let items: IItem[] = bodyJson.items;
        console.log(`found items ; ${items.length}`);

        let isUser = await userExists(userId);
        if (!isUser) {
            response = {
                'statusCode': 400,
                'body': { "message": `An error occurred` },
                'headers': {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        } else {

            // check if we need to delete any items
            const scanOutput = await dynamoDbClient.scan({
                "TableName": "UserCartTable",
                "ConsistentRead": false,
                "FilterExpression": "#7e8f0 = :7e8f0",
                "ExpressionAttributeValues": {
                    ":7e8f0": {
                        "S": `${userId}`
                    }
                },
                "ExpressionAttributeNames": {
                    "#7e8f0": "username"
                }
            }).promise();

            // delete all items in current shopping cart
            if (scanOutput && scanOutput.Items && scanOutput.Items.length > 0) {

                for (let existingItem of scanOutput.Items) {
                    let productId = existingItem["productId"].S;
                    const deleteItemOutput = await dynamoDbClient.deleteItem({
                        "TableName": "UserCartTable",
                        "Key": {
                            "username": {
                                "S": `${userId}`
                            },
                            "productId": {
                                "S": `${productId}`
                            }
                        }
                    }).promise();
                }
            }

            // add all items from posted JSON
            if (items.length > 0) {
                for (let item of items) {
                    console.log(`found productId : ${item.productId}`)
                    console.log(`found amount : ${item.amount}`)
                    let productId = item.productId;
                    let amount = item.amount;
                    const putItemOutput = await dynamoDbClient.putItem({
                        "TableName": "UserCartTable",
                        "Item": {
                            "username": {
                                "S": `${userId}`
                            },
                            "productId": {
                                "S": `${productId}`
                            },
                            "amount": {
                                "N": `${amount}`
                            }
                        }
                    }).promise();
                }
            }
        }

        response = {
            'statusCode': 200,
            'body': { message: `Cart updated` },
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        }
    } catch (err) {
        console.log(err);
        // return err;
        response = {
            'statusCode': err.statusCode,
            'body': { message: `${err.message} : an item with this id already exists` },
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        }
    }

    return response;
};

export const getHandler = async (event: APIGatewayProxyEvent, context: Context) => {
    try {

        let cartArray = [];

        let bodyJson = JSON.parse(<string>event.body);
        let userId = (<any>event.pathParameters).userId;

        // let username: string = bodyJson.username;

        // let items: IItem[] = bodyJson.items;

        let isUser = await userExists(userId);
        if (!isUser) {
            response = {
                'statusCode': 400,
                'body': { message: `An error occurred` },
                'headers': {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        } else {

            // fetch all productId's in table for this user
            const scanOutput = await dynamoDbClient.scan({
                "TableName": "UserCartTable",
                "ConsistentRead": false,
                "FilterExpression": "#7e8f0 = :7e8f0",
                "ExpressionAttributeValues": {
                    ":7e8f0": {
                        "S": `${userId}`
                    }
                },
                "ExpressionAttributeNames": {
                    "#7e8f0": "username"
                }
            }).promise();

            // fetch product information for each product in the shopping cart.
            if (scanOutput && scanOutput.Items && scanOutput.Items.length > 0) {

                for (let existingItem of scanOutput.Items) {
                    let productId = existingItem["productId"].S;
                    let amount = existingItem["amount"].N ? existingItem["amount"].N : "0";
                    // let productDetails = 
                    let id = productId ? productId : "0";

                    let outputProduct = await dynamoDbClient.scan(getProductScanParameters(id)).promise();


                    if (outputProduct?.Items) {
                        for (let item of outputProduct?.Items) {
                            let cartProduct = getProduct(item);
                            cartProduct.amount = parseInt(amount);
                            cartArray.push(cartProduct);
                        }
                    }
                }
            }

        }

        response = {
            'statusCode': 200,
            'body': JSON.stringify(cartArray),
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        }
    } catch (err) {
        console.log(err);
        // return err;
        response = {
            'statusCode': err.statusCode,
            'body': `${err.message} : an item with this id already exists`,
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        }
    }

    return response
};
