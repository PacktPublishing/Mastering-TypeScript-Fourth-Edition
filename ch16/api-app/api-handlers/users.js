"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandler = exports.getHandler = exports.userExists = exports.postHandler = void 0;
const db_functions_1 = require("./db-functions");
//
// POST should handle a user logging in
//
const postHandler = async (event, context) => {
    var _a;
    let response = {};
    try {
        let bodyJson = JSON.parse(event.body);
        let username = bodyJson.username;
        let password = bodyJson.password;
        console.log(`username: |username|`);
        const scanOutput = await db_functions_1.dynamoDbClient.scan({
            "TableName": "UserTable",
            "ConsistentRead": true,
            "FilterExpression": "#87ea0 = :87ea0",
            "ExpressionAttributeValues": {
                ":87ea0": {
                    "S": `${username}`
                }
            },
            "ExpressionAttributeNames": {
                "#87ea0": "username"
            }
        }).promise();
        // console.log(`found user`);
        // return {
        //     "statusCode": 200,
        //     "body": scanOutput
        // }
        if (scanOutput.Items && ((_a = scanOutput.Items) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            let userRecord = scanOutput.Items[0];
            console.log(`checkign vs ${userRecord["password"].S}`);
            if (password === userRecord["password"].S) {
                response = {
                    'statusCode': 200,
                    'body': {},
                    'headers': {
                        "Access-Control-Allow-Origin": "*"
                    }
                };
            }
            else {
                response = {
                    'statusCode': 401,
                    'body': { "message": `Username password combination invalid` },
                    'headers': {
                        "Access-Control-Allow-Origin": "*"
                    }
                };
            }
        }
        else {
            console.log(`scanOutput.length < 0`);
            response = {
                'statusCode': 401,
                'body': { "message": `Username password combination invalid` },
                'headers': {
                    "Access-Control-Allow-Origin": "*"
                }
            };
        }
    }
    catch (err) {
        console.log(err);
        // return err;
        response = {
            'statusCode': err.statusCode,
            'body': { 'message': `${err.message} : an item with this id already exists` }
        };
    }
    return response;
};
exports.postHandler = postHandler;
async function userExists(username) {
    var _a;
    const scanOutput = await db_functions_1.dynamoDbClient.scan({
        "TableName": "UserTable",
        "ConsistentRead": false,
        "FilterExpression": "#87ea0 = :87ea0",
        "ExpressionAttributeValues": {
            ":87ea0": {
                "S": `${username}`
            }
        },
        "ExpressionAttributeNames": {
            "#87ea0": "username"
        }
    }).promise();
    if (scanOutput.Items && ((_a = scanOutput.Items) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.userExists = userExists;
const getHandler = async (event, context) => {
    let response = {};
    try {
        let userId = event.pathParameters.userId;
        let isUser = await userExists(userId);
        if (isUser) {
            response = {
                'statusCode': 200,
                'body': `User exists`
            };
        }
        else {
            response = {
                'statusCode': 404,
                'body': `Not found`
            };
        }
    }
    catch (err) {
        console.log(err);
        // return err;
        response = {
            'statusCode': err.statusCode,
            'body': `${err.message} : an item with this id already exists`
        };
    }
    return response;
};
exports.getHandler = getHandler;
//
// POST should handle a user logging in
//
const registerHandler = async (event, context) => {
    let response = {};
    try {
        let bodyJson = JSON.parse(event.body);
        let username = bodyJson.username;
        let password = bodyJson.password;
        await db_functions_1.dynamoDbClient.putItem({
            "TableName": "UserTable",
            "Item": {
                "username": {
                    "S": `${username}`
                },
                "password": {
                    "S": `${password}`
                }
            },
            "ConditionExpression": "attribute_not_exists(#3f9c0)",
            "ExpressionAttributeNames": {
                "#3f9c0": "username"
            }
        }).promise();
        response = {
            'statusCode': 200,
            'body': {},
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
exports.registerHandler = registerHandler;
