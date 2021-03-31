function printGeneric<T>(value: T) {
    console.log(`typeof T is : ${typeof value}`);
    console.log(`value is : ${value}`)
}

printGeneric(1);
printGeneric("test");
printGeneric(true);
printGeneric(() => { });
printGeneric({ id: 1 });

printGeneric<string>("test");
// printGeneric<string>(1);

//
// multiple generic types
//

function usingTwoTypes<A, B>(first: A, second: B) {
}

usingTwoTypes<number, string>(1, "test");
usingTwoTypes(1, "test");
usingTwoTypes<boolean, boolean>(true, false);
usingTwoTypes("first", "second");

//
// constraining the type of T
//

interface IName {
    name: string;
    print(): void;
}
interface INameDescr extends IName {
    descr: String;
}

class Printer<T extends INameDescr> {
    print(items: Array<T>) {
        for (let item of items) {
            console.log(`array item : ${item.print}`)
        }
    }
}



class Concatenator<T extends Array<string> | Array<number>> {
    public concatenateArray(items: T): string {
        let returnString = "";
        for (let i = 0; i < items.length; i++) {
            returnString += i > 0 ? "," : "";
            returnString += items[i].toString();
        }
        return returnString;
    }
}

let concator = new Concatenator();

let concatResult = concator.concatenateArray([
    "first", "second", "third"
]);
console.log(`concatResult = ${concatResult}`);

concatResult = concator.concatenateArray([
    1000, 2000, 3000
]);
console.log(`concatResult = ${concatResult}`);

// concatResult = concator.concatenateArray([
//     true, false, true
// ]);

//
// using the type T
//

interface IPrintId {
    id: number;
    print(): void;
}

interface IPrintName {
    name: string;
    print(): void;
}

function useT<T extends IPrintId | IPrintName>(item: T)
    : void {
    item.print();
    // item.id = 1; // error : id is not common
    // item.name = "test"; // error : name is not common
}

//
// generic constraints
//



function printProperty<T, K extends keyof T>
    (object: T, key: K) {
    let propertyValue = object[key];
    console.log(`object[${key}] = ${propertyValue}`);
}

let obj1 = {
    id: 1,
    name: "myName",
    print() { console.log(`${this.id}`) }
}

printProperty(obj1, "id");
printProperty(obj1, "name");
// printProperty(obj1, "surname");

printProperty(obj1, "print");
// obj1.print();

// 
// generic interfaces
//


interface IPrint {
    print(): void;
}

interface ILogInterface<T extends IPrint> {
    logToConsole(iPrintObj: T): void;
}

class LogClass<T extends IPrint> implements ILogInterface<T> {
    logToConsole(iPrintObj: T): void {
        iPrintObj.print();
    }
}

let printObject: IPrint = {
    print() { console.log(`printObject.print() called`) }
}

let logClass = new LogClass();
logClass.logToConsole(printObject);


//
// creating new objects within generics
//

class ClassA {
    id: number = 1;
}

class ClassB { }

// function createClassInstance<T>
//     (arg1: T): T {
//     return new arg1(); // error : see below
// }

function createClassInstance<T>
    (arg1: { new(): T }): T {
    return new arg1();
}

let classAInstance = createClassInstance(ClassA);

console.log(`${JSON.stringify(classAInstance)}`);