console.log(`pipe_map.ts`);

import { of, Observable, interval } from "rxjs";
import { map, take } from "rxjs/operators";

const emitter: Observable<number> = of(1, 2, 3, 4);

//
// single map function 
//

const modulus: Observable<number> = emitter.pipe(
    map((value: number) => {
        console.log(`received : ${value}`);
        return value % 2;
    }));

modulus.subscribe((value: number) => {
    console.log(`modulus : ${value}`);
});

//
// multiple map functions
// 
const stringMap = emitter.pipe(
    map((value: number) => { return value * 2 }),
    map((value: number) => { return `str_${value}` })
);

stringMap.subscribe((value: string) => {
    console.log(`stringMap emitted : ${value}`);
});


// 
// swallowing values
//

const emitOneTwo = of(1, 2);

const swallowedValues: Observable<number | null> =
    emitOneTwo.pipe(
        map((value: number) => {
            if (value < 2) {
                return null;
            }
            return value;
            // console.log(`swallowing ${value}`);
            // not returning a value;
        })
    );

swallowedValues.subscribe((value: number | null) => {
    console.log(`subscriber received value: ${value}`)
});

//
// interval and take, then map
//

const sourceInterval = interval(1000);

const fiveNumbers = sourceInterval.pipe(
    take(5),
    map((value: number) => {
        console.log(`map received : ${value}`)
        return `string_${value * 2}`;
    })
);

fiveNumbers.subscribe((value: string) => {
    console.log(`${new Date().toLocaleTimeString()} ${value}`);
});

