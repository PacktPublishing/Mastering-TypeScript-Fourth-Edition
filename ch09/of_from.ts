console.log(`of_from.ts`);

//
// of
//

import { of, from, Observable } from "rxjs";

const emitter: Observable<number> = of(1, 2, 3, 4);

emitter.subscribe((value: number) => {
    console.log(`value: ${value}`)
});

//
// from
//

const emitArray = <Observable<number>>from([1, 2, 3, 4]);

emitArray.subscribe((value: number) => {
    console.log(`arr: ${value}`);
});


