
export interface IProduct {
    id: number;
    name: string;
    type: string;
    image: string;
    longDescription: string;
    specs: ISpecs;
    amount?: number;
}
export interface ISpecs {
    actuationForce: string;
    actuationPoint: string;
    bottomOut: string;
    bottomOutTravel: string;
    price: string;
}

export interface ICartItemPostData {
    productId: number;
    amount: number;
}

export class CartCollection {
    items: IProduct[] = [];
    constructor() {
    }
    getCartItemsPostData() {
        let returnData = [];
        for (let item of this.items) {
            returnData.push({ productId: item.id, amount: item.amount });
        }
        return { items: returnData };
    }
}