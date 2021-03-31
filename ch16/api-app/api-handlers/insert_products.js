"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_functions_1 = require("./db-functions");
const error_handlers_1 = require("./error-handlers");
const product_data_1 = require("./product-data");
loadProducts();
async function loadProducts() {
    var _a, _b, _c, _d, _e;
    for (let product of product_data_1.items) {
        let putItemInput = createPutItemInput(product.id.toString(), product.name, product.type, product.image, product.longDescription, product.specs ? parseFloat((_a = product.specs) === null || _a === void 0 ? void 0 : _a.actuationForce) : 0, product.specs ? parseFloat((_b = product.specs) === null || _b === void 0 ? void 0 : _b.actuationPoint) : 0, product.specs ? parseFloat((_c = product.specs) === null || _c === void 0 ? void 0 : _c.bottomOut) : 0, product.specs ? parseFloat((_d = product.specs) === null || _d === void 0 ? void 0 : _d.bottomOutTravel) : 0, product.specs ? parseFloat((_e = product.specs) === null || _e === void 0 ? void 0 : _e.price) * 100 : 0);
        let result = await executePutItem(db_functions_1.dynamoDbClient, putItemInput);
    }
}
function createPutItemInput(id, name, type, image, longDescription, actuationForce, actuationPoint, bottomOut, bottomOutTravel, price) {
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
    };
}
async function executePutItem(dynamoDbClient, putItemInput) {
    // Call DynamoDB's putItem API
    try {
        const putItemOutput = await dynamoDbClient.putItem(putItemInput).promise();
        console.info('Successfully put item.');
        // Handle putItemOutput
    }
    catch (err) {
        error_handlers_1.handlePutItemError(err);
    }
}
