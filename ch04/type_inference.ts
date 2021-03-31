// 
// mapped types
//

interface IAbRequired {
    a: number;
    b: string;
}

let ab: IAbRequired = {
    a: 1, b: "test"
}

type WeakInterface<T> = {
    [K in keyof T]?: T[K];
}

let allOptional: WeakInterface<IAbRequired> = {}

let readonlyVar: Readonly<IAbRequired> = {
    a: 1, b: "test"
}

// readonlyVar.a = 1;

// 
// Pick
//

interface IAbc {
    a: number;
    b: string;
    c: boolean
}

type PickAb = Pick<IAbc, "a" | "b">;

let pickAbObject: PickAb = {
    a: 1,
    b: "test"
}

//
// Record
//

type RecordedCd = Record<"c" | "d", number>;

let recordedCdVar: RecordedCd = {
    c: 1,
    d: 1
}

//
// conditional types
//

type NumberOrString<T> = T extends number ? number : string;

function logNumberOrString<T>(input: NumberOrString<T>) {
    console.log(`logNumberOrString : ${input}`);
}

logNumberOrString<number>(1);
logNumberOrString<string>("test");
// logNumberOrString<boolean>(true);
logNumberOrString<boolean>("boolean does not extend number");

//
// conditional type chaining
//

interface IA {
    a: number;
}

interface IAb {
    a: number;
    b: string;
}

interface IAbc {
    a: number;
    b: string;
    c: boolean;
}

type abc_ab_a<T> = T extends IAbc ? [number, string, boolean] :
    T extends IAb ? [number, string] :
    T extends IA ? [number] :
    never;

function getTupleStringAbc<T>(tupleValue: abc_ab_a<T>): string {
    let [...tupleDestructured] = tupleValue;
    let returnString = "|";
    for (let value of tupleDestructured) {
        returnString += `${value}|`;
    }
    return returnString;
}

let keyA = getTupleStringAbc<IA>([1]);
console.log(`keyA = ${keyA}`);

let keyAb = getTupleStringAbc<IAb>([1, "test"]);
console.log(`keyAb = ${keyAb}`);

let keyAbc = getTupleStringAbc<IAbc>([1, "test", true]);
console.log(`keyAbc = ${keyAbc}`);

// 
// distributed conditional types
//

type dateOrNumberOrString<T> =
    T extends Date ? Date :
    T extends number ? Date | number :
    T extends string ? Date | number | string :
    never;

function compareValues<
    T extends string | number | Date | boolean
>(
    input: T, compareTo: dateOrNumberOrString<T>
) {
    // do comparison
}

compareValues(new Date(), new Date());
compareValues(1, new Date());
compareValues(1, 2)
compareValues("test", new Date());
compareValues("test", 1);
compareValues("test", "test");

//
// conditional type inference
//

type inferFromPropertyType<T> =
    T extends { id: infer U } ? U : never;

function testInferFromPropertyType<T>(
    arg: inferFromPropertyType<T>
) { }

testInferFromPropertyType<{ id: string }>("test");
testInferFromPropertyType<{ id: number }>(1);

//
// type inference from function signatures
//

type inferredFromFnParam<T> =
    T extends (a: infer U) => void ? U : never;

function testInferredFromFnParam<T>(
    arg: inferredFromFnParam<T>
) { }

testInferredFromFnParam<(a: number) => void>(1);
testInferredFromFnParam<(a: string) => void>("test");


type inferredFromFnReturnType<T> =
    T extends (a: string) => infer U ? U : never;

function testInferredFromReturnType<T>(
    arg: inferredFromFnReturnType<T>
) { }

testInferredFromReturnType<(a: string) => number>(1);
testInferredFromReturnType<(a: string) => boolean>(false);

//
// type inference from arrays
//

type inferredTypeFromArray<T> = T extends (infer U)[] ? U : never;

function testInferredFromArray<T>(args: inferredTypeFromArray<T>) { }

testInferredFromArray<string[]>("test");
testInferredFromArray<number[]>(1);

//
// standard conditional types
//

// exclude
type ExcludeStringAndNumber = Exclude<
    string | number | boolean,
    string | number>;

// extract
type StringOrNumber = Extract<
    string | boolean | never,
    string | number>;

let stringValue: StringOrNumber = "test";


// nonnullable
type NotNullOrUndef = NonNullable<number | undefined | null>;
let numValue: NotNullOrUndef = 1;
