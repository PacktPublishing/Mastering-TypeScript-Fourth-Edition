console.log(`interfaces.ts`);

//
// interfaces and optional properties
//

interface IIdName {
    id: number;
    name: string;
}

let idObject: IIdName = {
    id: 2,
    name: "this is a name"
}

interface IOptional {
    id: number;
    name?: string;
}

let optionalId: IOptional = {
    id: 1
}

let optionalIdName: IOptional = {
    id: 2,
    name: "optional name"
}

//
// weak types
//


interface IWeakType {
    id?: number,
    name?: string
}

let weakTypeNoOverlap: IWeakType = {
    // description: "a description",
    name: "a name"
}

//
// the in operator
//

interface IIdName {
    id: number;
    name: string;
}

interface IDescrValue {
    descr: string;
    value: number;
}


function printNameOrValue(
    obj: IIdName | IDescrValue): void {
    if ('id' in obj) {
        console.log(`obj.name : ${obj.name}`);
    }
    if ('descr' in obj) {
        console.log(`obj.value : ${obj.value}`);
    }
}

printNameOrValue({
    id: 1,
    name: "nameValue"
});

printNameOrValue({
    descr: "description",
    value: 2
});

//
// keyof
//

interface IPerson {
    id: number;
    name: string;
}

type PersonPropertyName = keyof IPerson;
type PersonPropertyLiteral = "id" | "name";

function getProperty(key: PersonPropertyName, value: IPerson) {
    console.log(`${key} = ${value[key]}`);
}

getProperty("id",
    { id: 1, name: "firstName" }
);
getProperty("name",
    { id: 2, name: "secondName" }
);

// generates error:
// 
// getProperty("telephone",
//     { id: 3, name: "thirdName" }
// );

