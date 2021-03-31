

export interface IProduct {
    id: number;
    name: string;
    type: string;
    image: string;
    longDescription: string;
    specs?: ISpecs;
}
export interface ISpecs {
    actuationForce: string;
    actuationPoint: string;
    bottomOut: string;
    bottomOutTravel: string;
    price: string;
}

export class Collection {
    handleItemClicked(id: number) { }
    items: IProduct[] = [];
    //     these manually created items can be deleted
    //     [
    //         {
    //         id: 1,
    //         name: "Holy Panda",
    //         type: "Tactile"
    //         }
    //     ]

}