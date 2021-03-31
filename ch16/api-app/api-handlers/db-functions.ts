
import * as AWS from 'aws-sdk';


export const region = 'us-east-2';
export const dynamoDbClient = createDynamoDbClient(region);

export function createDynamoDbClient(regionName: string) {
    // Set the region
    AWS.config.update({ region: regionName });
    // Use the following config instead when using DynamoDB Local
    // AWS.config.update({region: 'localhost', endpoint: 'http://localhost:8000', accessKeyId: 'access_key_id', secretAccessKey: 'secret_access_key'});
    return new AWS.DynamoDB();
}
