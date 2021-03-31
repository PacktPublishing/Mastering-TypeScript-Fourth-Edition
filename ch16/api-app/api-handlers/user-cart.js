"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = exports.postHandler = void 0;
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const db_functions_1 = require("./db-functions");
const product_helper_1 = require("./product-helper");
const users_1 = require("./users");
const postHandler = async (event, context) => {
    let response = {};
    try {
        let bodyJson = JSON.parse(event.body);
        let userId = event.pathParameters.userId;
        // let username: string = bodyJson.username;
        let items = bodyJson.items;
        console.log(`found items ; ${items.length}`);
        let isUser = await users_1.userExists(userId);
        if (!isUser) {
            response = {
                'statusCode': 400,
                'body': { "message": `An error occurred` },
                'headers': {
                    "Access-Control-Allow-Origin": "*"
                }
            };
        }
        else {
            // check if we need to delete any items
            const scanOutput = await db_functions_1.dynamoDbClient.scan({
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
                    const deleteItemOutput = await db_functions_1.dynamoDbClient.deleteItem({
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
                    console.log(`found productId : ${item.productId}`);
                    console.log(`found amount : ${item.amount}`);
                    let productId = item.productId;
                    let amount = item.amount;
                    const putItemOutput = await db_functions_1.dynamoDbClient.putItem({
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
        };
    }
    catch (err) {
        console.log(err);
        // return err;
        response = {
            'statusCode': err.statusCode,
            'body': { message: `${err.message} : an item with this id already exists` },
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        };
    }
    return response;
};
exports.postHandler = postHandler;
const getHandler = async (event, context) => {
    try {
        let cartArray = [];
        let bodyJson = JSON.parse(event.body);
        let userId = event.pathParameters.userId;
        // let username: string = bodyJson.username;
        // let items: IItem[] = bodyJson.items;
        let isUser = await users_1.userExists(userId);
        if (!isUser) {
            response = {
                'statusCode': 400,
                'body': { message: `An error occurred` },
                'headers': {
                    "Access-Control-Allow-Origin": "*"
                }
            };
        }
        else {
            // fetch all productId's in table for this user
            const scanOutput = await db_functions_1.dynamoDbClient.scan({
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
                    let outputProduct = await db_functions_1.dynamoDbClient.scan(product_helper_1.getProductScanParameters(id)).promise();
                    if (outputProduct === null || outputProduct === void 0 ? void 0 : outputProduct.Items) {
                        for (let item of outputProduct === null || outputProduct === void 0 ? void 0 : outputProduct.Items) {
                            let cartProduct = product_helper_1.getProduct(item);
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
        };
    }
    catch (err) {
        console.log(err);
        // return err;
        response = {
            'statusCode': err.statusCode,
            'body': `${err.message} : an item with this id already exists`,
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        };
    }
    return response;
};
exports.getHandler = getHandler;
