import { interval, forkJoin, of, Observable } from "rxjs";
import { take, map, mergeAll, zip, toArray } from "rxjs/operators";

console.log(`forkjoin.ts`);


const onePerSecond = interval(1000);

const threeNumbers: Observable<number[]> = onePerSecond.pipe(
    take(3),
    map((value: number) => {
        console.log(`>> threeNumbers emitting : ${value}`);
        return value;
    }),
    toArray()
);

const twoStrings: Observable<string[]> = onePerSecond.pipe(
    take(2),
    map((value: number) => {
        console.log(`>> twoStrings emitting : value_${value}`);
        return `value_${value}`;
    }),
    toArray()
);

forkJoin(
    [threeNumbers,
        twoStrings]
).subscribe((values) => {
    console.log(`<< threeNumbers returned : ${values[0]}`);
    console.log(`<< twoStrings returned : ${values[1]}`);
});

// // // named output forkjoin
forkJoin(
    [threeNumbers,
        twoStrings]
).subscribe((
    [threeNumbersOutput, twoStringsOutput]
) => {
    console.log(`<< threeNumbersOutput : ${threeNumbersOutput}`);
    console.log(`<< twoStringsOutput : ${twoStringsOutput}`);
});

