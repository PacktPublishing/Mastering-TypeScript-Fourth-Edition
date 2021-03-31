console.log(`mergeMap.ts`);

import { of, from, Observable } from "rxjs";
import { map, mergeMap, delay, concatMap } from "rxjs/operators";

//
// mergeMap
//
interface IProductId {
    id: number;
}

interface IProductDescription {
    name: string;
    description: string;
}

const productList = <Observable<IProductId>>from(
    [{ id: 1 }, { id: 2 }, { id: 3 }]
);

function getProductName(id: number):
    Observable<IProductDescription> {
    return of(
        {
            id: id,
            name: `Product_${id}`,
            description: `Description_${id}`
        }
    );
}

productList.pipe(
    map((value: IProductId) => {
        console.log(`Product id: ${value.id}`);
        return getProductName(value.id);
    })
).subscribe((value: Observable<IProductDescription>) => {
    value.subscribe((value: IProductDescription) => {
        console.log(`product name : ${value.name}`);
        console.log(`product desc : ${value.description}`);
    });
});

productList.pipe(
    mergeMap((value: IProductId):
        Observable<IProductDescription> => {
        console.log(`Product id: ${value?.id}`);
        return getProductName(value.id);
    })
).subscribe((value: IProductDescription) => {
    console.log(`product name : ${value.name}`)
    console.log(`product desc : ${value.description}`)
});

//
// concat map
//

const emitTreeTwoOne = of(3, 2, 1);

const delayedEmit = emitTreeTwoOne.pipe(
    // mergeMap((value: number) => {
    concatMap((value: number) => {
        console.log(`>> emit >> 
        ${new Date().toLocaleTimeString()} 
        value : ${value}, 
        delaying : ${1000 * value} ms`);
        return of(value).pipe(delay(1000 * value))
    })
);

delayedEmit.subscribe(value => {
    console.log(`<< receive << 
        ${new Date().toLocaleTimeString()} 
        received value : ${value}`);
});

