// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
import {
    APIGatewayProxyEvent,
    Context
} from 'aws-lambda';
import { dynamoDbClient } from './db-functions';
//
// POST should handle a user logging in
//
export const postHandler = async (
    event: APIGatewayProxyEvent, context: Context
) => {
    let response = {};
    try {


        let bodyJson = JSON.parse(<string>event.body);

        let username: string = bodyJson.username;
        let password: string = bodyJson.password;
        console.log(`username: |username|`)

        const scanOutput = await dynamoDbClient.scan({
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

        if (scanOutput.Items && scanOutput.Items?.length > 0) {
            let userRecord = scanOutput.Items[0];
            console.log(`checkign vs ${userRecord["password"].S}`)
            if (password === userRecord["password"].S) {
                response = {
                    'statusCode': 200,
                    'body': {},
                    'headers': {
                        "Access-Control-Allow-Origin": "*"
                    }
                }

            } else {
                response = {
                    'statusCode': 401,
                    'body': { "message": `Username password combination invalid` },
                    'headers': {
                        "Access-Control-Allow-Origin": "*"
                    }
                }

            }

        } else {
            console.log(`scanOutput.length < 0`)
            response = {
                'statusCode': 401,
                'body': { "message": `Username password combination invalid` },
                'headers': {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        }


    } catch (err) {
        console.log(err);
        // return err;
        response = {
            'statusCode': err.statusCode,
            'body': { 'message': `${err.message} : an item with this id already exists` }
        }
    }

    return response;
};

export async function userExists(
    username: string
): Promise<boolean> {
    const scanOutput = await dynamoDbClient.scan({
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

    if (scanOutput.Items && scanOutput.Items?.length > 0) {
        return true;
    } else {
        return false;
    }
}

export const getHandler = async (
    event: APIGatewayProxyEvent, context: Context
) => {
    let response = {};
    try {
        let userId = (<any>event.pathParameters).userId;

        let isUser = await userExists(userId);

        if (isUser) {
            response = {
                'statusCode': 200,
                'body': `User exists`
            }
        } else {
            response = {
                'statusCode': 404,
                'body': `Not found`
            }
        }
    } catch (err) {
        console.log(err);
        // return err;
        response = {
            'statusCode': err.statusCode,
            'body': `${err.message} : an item with this id already exists`
        }
    }

    return response;
};


//
// POST should handle a user logging in
//
export const registerHandler = async (
    event: APIGatewayProxyEvent, context: Context
) => {
    let response = {};
    try {


        let bodyJson = JSON.parse(<string>event.body);

        let username: string = bodyJson.username;
        let password: string = bodyJson.password;

        await dynamoDbClient.putItem({
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

    return response;
};
