export interface IProduct {
    id: number;
    name: string;
    type: string;
    image: string;
    longDescription?: string;
    amount?: number;
    specs: ISpecs;

}
export interface ISpecs {
    actuationForce?: string;
    actuationPoint?: string;
    bottomOut?: string;
    bottomOutTravel?: string;
    price: string;
}

export interface ICartItemPostData {
    productId: number;
    amount: number;
}

export class CartCollection {
    items: IProduct[];
    constructor() {
        this.items = [
            {
                id: 1,
                name: "Holy Panda",
                type: "Tactile",
                image: "holy_panda.png",
                amount: 70,
                specs: {
                    price: "1.60"
                }
            }, {
                id: 3,
                name: "Kiwis",
                type: "Tactile",
                image: "kiwis.png",
                amount: 70,
                specs: {
                    price: "0.95"
                }
            }, {
                id: 7,
                name: "Zilent 67g",
                type: "Tactile",
                image: "zilent_67.png",
                amount: 110,
                specs: {
                    price: "1.80"
                }
            }
        ];
    }
}