import { dynamoDbClient } from "./db-functions";
import { handlePutItemError } from "./error-handlers";
import { items } from "./product-data";


loadProducts();

async function loadProducts() {
    for (let product of items) {
        let putItemInput = createPutItemInput(
            product.id.toString(),
            product.name,
            product.type,
            product.image,
            product.longDescription,
            product.specs ? parseFloat(product.specs?.actuationForce) : 0,
            product.specs ? parseFloat(product.specs?.actuationPoint) : 0,
            product.specs ? parseFloat(product.specs?.bottomOut) : 0,
            product.specs ? parseFloat(product.specs?.bottomOutTravel) : 0,
            product.specs ? parseFloat(product.specs?.price) * 100 : 0
        );

        let result = await executePutItem(dynamoDbClient, putItemInput);
    }
}


function createPutItemInput(
    id: string,
    name: string,
    type: string,
    image: string,
    longDescription: string,
    actuationForce: number,
    actuationPoint: number,
    bottomOut: number,
    bottomOutTravel: number,
    price: number
) {
    return {
        "TableName": "ProductTable",
        "Item": {
            "id": {
                "S": `${id}`
            },
            "name": {
                "S": `${name}`
            },
            "type": {
                "S": `${type}`
            },
            "image": {
                "S": `${image}`
            },
            "longDescription": {
                "S": `${longDescription}`
            },
            "actuationForce": {
                "N": `${actuationForce}`
            },
            "actuationPoint": {
                "N": `${actuationPoint}`
            },
            "bottomOut": {
                "N": `${bottomOut}`
            },
            "bottomOutTravel": {
                "N": `${bottomOutTravel}`
            },
            "price": {
                "N": `${price}`
            }
        }
    }
}

async function executePutItem(dynamoDbClient: AWS.DynamoDB, putItemInput: AWS.DynamoDB.PutItemInput) {
    // Call DynamoDB's putItem API
    try {
        const putItemOutput = await dynamoDbClient.putItem(putItemInput).promise();
        console.info('Successfully put item.');
        // Handle putItemOutput
    } catch (err) {
        handlePutItemError(err);
    }
}