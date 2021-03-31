function createPutItemInput(
    productId: string,
    productName: string,
    productType: string,
    price: number
) {
    return {
        "TableName": "ProductTable",
        "Item": {
            "id": {
                "S": `${productId}`
            },
            "name": {
                "S": `${[productName]}`
            },
            "type": {
                "S": `${productType}`
            },
            "price": {
                "N": `${price}`
            }
        }
    }
}