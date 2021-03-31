console.log(`catch_error.ts`);

import { of, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

interface IValue {
    value: number
}
interface INestedObj {
    id?: IValue;
}
const objEmit: Observable<INestedObj> = of(
    { id: { value: 1 } },
    {},
    { id: { value: 2 } }
);

const returnIdValue = objEmit.pipe(
    map((value: INestedObj) => {
        return value.id!.value;
    }),
    catchError((error: unknown) => {
        console.log(`stream caught : ${error}`);
        return of(null);
    })
);

returnIdValue.subscribe(
    // called for each observable value
    (value: number | null) => {
        console.log(`received ${value} `);
    },
    // called if an error occurs
    (error: unknown) => {
        console.log(`error : ${error}`);
    },
    // complete function
    () => {
        console.log(`complete`);
    }
);