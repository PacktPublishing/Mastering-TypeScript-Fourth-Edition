"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProductScanParameters = void 0;
function getProductScanParameters(productId) {
    if (productId) {
        return {
            "TableName": "ProductTable",
            "ConsistentRead": false,
            "FilterExpression": "#87ea0 = :87ea0",
            "ExpressionAttributeValues": {
                ":87ea0": {
                    "S": `${[productId]}`
                }
            },
            "ExpressionAttributeNames": {
                "#87ea0": "id"
            }
        };
    }
    else {
        return {
            "TableName": "ProductTable",
            "ConsistentRead": false
        };
    }
}
exports.getProductScanParameters = getProductScanParameters;
function getProduct(item) {
    let product = {
        id: parseInt(item["id"].S),
        name: item["name"].S,
        type: item["type"].S,
        image: item["image"].S,
        longDescription: item["longDescription"].S,
        specs: {
            actuationForce: item["actuationForce"].N,
            actuationPoint: item["actuationPoint"].N,
            bottomOut: item["bottomOut"].N,
            bottomOutTravel: item["bottomOutTravel"].N,
            price: item["price"].N ?
                (parseInt(item["price"].N) / 100).toFixed(2) : "",
        }
    };
    return product;
}
exports.getProduct = getProduct;
