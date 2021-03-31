import * as AWS from 'aws-sdk';

// Handles errors during PutItem execution. Use recommendations in error messages below to 
// add error handling specific to your application use-case. 
export function handlePutItemError(err: AWS.AWSError) {
    if (!err) {
        console.error('Encountered error object was empty');
        return;
    }
    if (!err.code) {
        console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
        return;
    }
    switch (err.code) {
        case 'ConditionalCheckFailedException':
            console.error(`Condition check specified in the operation failed, review and update the condition check before retrying. Error: ${err.message}`);
            return;
        case 'TransactionConflictException':
            console.error(`Operation was rejected because there is an ongoing transaction for the item, generally safe to retry ' +
       'with exponential back-off. Error: ${err.message}`);
            return;
        case 'ItemCollectionSizeLimitExceededException':
            console.error(`An item collection is too large, you're using Local Secondary Index and exceeded size limit of` +
                `items per partition key. Consider using Global Secondary Index instead. Error: ${err.message}`);
            return;
        default:
            break;
        // Common DynamoDB API errors are handled below
    }
    handleCommonErrors(err);
}

export function handleCommonErrors(err: AWS.AWSError) {
    switch (err.code) {
        case 'InternalServerError':
            console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'ProvisionedThroughputExceededException':
            console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. `
                + `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`);
            return;
        case 'ResourceNotFoundException':
            console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
            return;
        case 'ServiceUnavailable':
            console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'ThrottlingException':
            console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'UnrecognizedClientException':
            console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. `
                + `Error: ${err.message}`);
            return;
        case 'ValidationException':
            console.error(`The input fails to satisfy the constraints specified by DynamoDB, `
                + `fix input before retrying. Error: ${err.message}`);
            return;
        case 'RequestLimitExceeded':
            console.error(`Throughput exceeds the current throughput limit for your account, `
                + `increase account level throughput before retrying. Error: ${err.message}`);
            return;
        default:
            console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
            return;
    }
}

// Handles errors during Scan execution. Use recommendations in error messages below to 
// add error handling specific to your application use-case. 
export function handleScanError(err: AWS.AWSError) {
    if (!err) {
        console.error('Encountered error object was empty');
        return;
    }
    if (!err.code) {
        console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
        return;
    }
    // here are no API specific errors to handle for Scan, common DynamoDB API errors are handled below
    handleCommonErrors(err);
}
