
//
// The any type
//

// var item1: any = { id: 1, name: "item1" }
// item1 = { id: 2 };

//
// Explicit casting
//

// var item1 = <any>{ id: 1, name: "item1" }
var item1 = { id: 1, name: "item1" } as any;
item1 = { id: 2 };



//
// The let keyword
//

// var index: number = 0;
let index: number = 0;

if (index == 0) {
    // var index: number = 2;
    let index: number = 2;
    console.log(`index = ${index}`);
}

console.log(`index = ${index}`);

//
// const values
//

const constValue = "this should not be changed";
// constValue = "updated";


//
// Union types
//

function printObject(obj: string | number) {
    console.log(`obj = ${obj}`);
}

printObject(1);
printObject("string value");

//
// type guards
//

function addWithUnion(
    arg1: string | number,
    arg2: string | number
) {
    // return arg1 + arg2;
}

function addWithTypeGuard(
    arg1: string | number,
    arg2: string | number
) {
    if (typeof arg1 === "string") {
        // arg 1 is treated as a string
        console.log(`arg1 is of type string`);
        return arg1 + arg2;
    }
    if (typeof arg1 === "number" && typeof arg2 === "number") {
        // both are numbers
        console.log(`arg1 and arg2 are numbers`);
        return arg1 + arg2;
    }
    console.log(`default return treat both as strings`)
    return arg1.toString() + arg2.toString();
}

console.log(` "1", "2" = ${addWithTypeGuard("1", "2")}`);
console.log(`  1 ,  2  = ${addWithTypeGuard(1, 2)}`);
console.log(`  1 , "2" = ${addWithTypeGuard(1, "2")}`);

//
// type aliases
// 

type StringOrNumber = string | number;

function addWithTypeAlias(
    arg1: StringOrNumber,
    arg2: StringOrNumber
) {
    return arg1.toString() + arg2.toString();
}

// 
// enums
//

enum DoorState {
    Open,
    Closed
}

function checkDoorState(state: DoorState) {
    console.log(`enum value is : ${state}`);
    switch (state) {
        case DoorState.Open:
            console.log(`Door is open`);
            break;
        case DoorState.Closed:
            console.log(`Door is closed`);
            break;
    }
}

checkDoorState(DoorState.Open);
checkDoorState(DoorState.Closed);

enum DoorStateSpecificValues {
    Open = 3,
    Closed = 7,
    Unspecified = 256
}

//
// string enums
//

enum DoorStateString {
    OPEN = "Open",
    CLOSED = "Closed"
}

console.log(`OPEN = ${DoorStateString.OPEN}`);

//
// const enums
//

const enum DoorStateConst {
    Open = 10,
    Closed = 20
}

console.log(`const Closed = ${DoorStateConst.Open}`);









// 
// Undefined
// 

let array = ["123", "456", "789"];

delete array[0];

for (let i = 0; i < array.length; i++) {
    // console.log(`array[${i}] = ${array[i]}`);
    checkAndPrintElement(array[i]);
}

function checkAndPrintElement(arrElement: string | undefined) {
    if (arrElement === undefined)
        console.log(`invalid array element`);
    else
        console.log(`valid array element : ${arrElement}`);
}




//
// Null
//

function printValues(a: number | null) {
    console.log(`a = ${a}`);
}

printValues(1);
printValues(null);


//
// conditional expressions
//

const value: number = 10;
const message: string = value > 10 ?
    "value is larger than 10" : "value is 10 or less";
console.log(message);

//
// optional chaining : testing for an object property before accessing it
//

let objectA = {
    nestedProperty: {
        name: "nestedPropertyName"
    }
}

// function printNestedObject(obj) {
//     console.log("obj.nestedProperty.name = "
//         + obj.nestedProperty.name);
// }

function printNestedObject(obj: any) {
    if (obj != undefined
        && obj.nestedProperty != undefined
        && obj.nestedProperty.name) {
        console.log(`name = ${obj.nestedProperty.name}`)
    } else {
        console.log(`name not found or undefined`);
    }
}

printNestedObject(null);
printNestedObject(undefined);
printNestedObject({
    aProperty: "another property"
});
printNestedObject({
    nestedProperty: {
        name: "nestedPropertyName"
    }
});

// 
// Optional chaining : using the syntax
//

function printNestedOptionalChain(obj: any) {
    if (obj?.nestedProperty?.name) {
        console.log(`name = ${obj.nestedProperty.name}`)
    } else {
        console.log(`name not found or undefined`);
    }
}

printNestedOptionalChain(undefined);
printNestedOptionalChain({
    aProperty: "another property"
});
printNestedOptionalChain({
    nestedProperty: {
        name: null
    }
});
printNestedOptionalChain({
    nestedProperty: {
        name: "nestedPropertyName"
    }
});


// 
// Nullish coalescing
//

function nullishCheck(a: number | undefined | null) {
    console.log(`a : ${a ?? `undefined or null`}`);
}

nullishCheck(1);
nullishCheck(null);
nullishCheck(undefined);

//
// null operands
//

function testNullOperands(a: number, b: number | null | undefined) {
    let addResult = a + (b ?? 0);
}

//
// definite assignment
//

// console.log(`lValue = ${lValue}`);
var lValue = 2;

let globalString!: string;

setGlobalString("this string is set");

console.log(`globalString = ${globalString}`);
// console.log(`globalString = ${globalString!}`);


function setGlobalString(value: string) {
    globalString = value;
}

// 
// object
//

let structuredObject: object = {
    name: "myObject",
    properties: {
        id: 1,
        type: "AnObject"
    }
}

function printObjectType(a: object) {
    console.log(`a: ${JSON.stringify(a)}`);
}

printObjectType(structuredObject);

// printObjectType("this is a string");

// 
// unknown
//

let a: any = "test";
let aNumber: number = 2;
aNumber = a;

let u: unknown = "an unknown";
u = 1;
let aNumber2: number;
// aNumber2 = u;
aNumber2 = <number>u;

console.log(`aString : ${a * 2}`);

//
// never
//

function alwaysThrows(): never {
    throw new Error("this will always throw");
    // return -1;
}

// 
// never in practice
//

enum AnEnum {
    FIRST,
    SECOND
}

function getEnumValue(enumValue: AnEnum): string {
    switch (enumValue) {
        case AnEnum.FIRST: return "First Case";
        case AnEnum.SECOND: return "Second Case";
    }
    let returnValue: never = enumValue;
    return returnValue;
}



//
// object spread
//

let firstObj: object = { id: 1, name: "firstObj" };
let secondObj: object = { ...firstObj };

console.log(`secondObj : ${JSON.stringify(secondObj)}`);

let nameObj: object = { name: "nameObj name" };
let idObj: object = { id: 1 };

let obj3 = { ...nameObj, ...idObj };

console.log(`obj3 = ${JSON.stringify(obj3)}`);

//
// spread precedence
//

let objPrec1: object = { id: 1, name: "obj1 name" };
let objPrec2: object = { id: 1001, desc: "obj2 description" };

let objPrec3 = { ...objPrec1, ...objPrec2 };
console.log(`objPrec3 : ${JSON.stringify(objPrec3, null, 4)}`);

//
// spread with arrays
//

let firstArray = [1, 2, 3];
let secondArray = [3, 4, 5];
let thirdArray = [...firstArray, ...secondArray];

console.log(`third array = ${thirdArray}`);

let objArray1 = [
    { id: 1, name: "first element" },
]

let objArray2 = [
    { id: 2, name: "second element" }
]

let objArray3 = [
    ...objArray1,
    { id: 3, name: "third element" },
    ...objArray2
]

console.log(`objArray3 = ${JSON.stringify(objArray3, null, 4)}`);

//
// tuples
//

let tuple1: [string, boolean];
tuple1 = ["test", true];

// tuple1 = ["test"];

//
// tuple destructuring
//

console.log(`tuple1[0] : ${tuple1[0]}`);
console.log(`tuple1[1] : ${tuple1[1]}`);
// console.log(`tuple1[2] : ${tuple1[2]}`);

let [tupleString, tupleBoolean] = tuple1;
console.log(`tupleString = ${tupleString}`);
console.log(`tupleBoolean = ${tupleBoolean}`);

//
// optional tuple elements
//

let tupleOptional: [string, boolean?];
tupleOptional = ["test", true];
tupleOptional = ["test"];

console.log(`tupleOptional[0] : ${tupleOptional[0]}`);
console.log(`tupleOptional[1] : ${tupleOptional[1]}`);

//
// tuples and spread syntax
//

let tupleRest: [number, ...string[]];
tupleRest = [1];
tupleRest = [1, "string1"];
tupleRest = [1, "string1", "string2"];

//
// object destructuring
//

let complexObject = {
    aNum: 1,
    bStr: "name",
    cBool: true
}

let { aNum, bStr, cBool } = complexObject;
console.log(`aNum : ${aNum}`);
console.log(`bStr : ${bStr}`);
console.log(`cBool : ${cBool}`);

let { aNum: objId, bStr: objName, cBool: isValid } = complexObject;
console.log(`objId : ${objId}`);
console.log(`objName : ${objName}`);
console.log(`isValid : ${isValid}`);




