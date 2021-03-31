import { DynamoDB } from "aws-sdk"
import { IProduct } from "./product-data";

export function getProductScanParameters(productId?: string) {
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
        }
    } else {
        return {
            "TableName": "ProductTable",
            "ConsistentRead": false
        }
    }
}

export function getProduct(item: DynamoDB.AttributeMap): IProduct {
    let product: IProduct = {
        id: parseInt(<string>item["id"].S),
        name: <string>item["name"].S,
        type: <string>item["type"].S,
        image: <string>item["image"].S,
        longDescription: <string>item["longDescription"].S,
        specs: {
            actuationForce: <string>item["actuationForce"].N,
            actuationPoint: <string>item["actuationPoint"].N,
            bottomOut: <string>item["bottomOut"].N,
            bottomOutTravel: <string>item["bottomOutTravel"].N,
            price:
                item["price"].N ?
                    (parseInt(item["price"].N) / 100).toFixed(2) : "",
        }
    }
    return product;
}