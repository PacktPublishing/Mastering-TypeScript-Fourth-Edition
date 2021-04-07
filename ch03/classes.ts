//
// classes
//

class SimpleClass {
    id: number | undefined;
    print(): void {
        console.log(`SimpleClass.id = ${this.id}`);
    }
}

let mySimpleClass = new SimpleClass();
mySimpleClass.id = 2020;
mySimpleClass.print();

//
// implmenting interfaces
//

class ClassA implements IPrint {
    print(): void {
        console.log(`ClassA.print() called.`)
    };
}

class ClassB implements IPrint {
    print(): void {
        console.log(`ClassB.print() called.`)
    };
}

interface IPrint {
    print(): void;
}

function printClass(a: IPrint) {
    a.print();
}

let classA = new ClassA();
let classB = new ClassB();

printClass(classA);
printClass(classB);

class ClassC {
    print(): void {
        console.log(`ClassC.print() called.`)
    };
}

let classC = new ClassC();
printClass(classC);

//
// class constructors
//

class ClassWithConstructor {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}

let classWithConstructor = new ClassWithConstructor(10);

console.log(`classWithConstructor = 
    ${JSON.stringify(classWithConstructor)}`);

//
// class modifiers
//

class ClassWithPublicProperty {
    public id: number | undefined;
}

let publicAccess = new ClassWithPublicProperty();
publicAccess.id = 10;

class ClassWithPrivateProperty {
    private id: number;
    constructor(id: number) {
        this.id = id;
    }
}

let privateAccess = new ClassWithPrivateProperty(10);
// privateAccess.id = 20;

privateAccess["id"] = 20;

//
// ES6 private fields
//

// NOTE : only ES6 compatible

// class ClassES6Private {
//     #id: number;
//     constructor(id: number) {
//         this.#id = id;
//     }
// }

// let es6PrivateClass = new ClassES6Private(10);
// es6PrivateClass.#id = 20;

//
// constructor access modifiers
//

class ClassWithCtorMods {
    constructor(public id: number, private name: string) {
    }
}

let myClassMod = new ClassWithCtorMods(1, "test");
console.log(`myClassMod.id = ${myClassMod.id}`);
// console.log(`myClassMod.name = ${myClassMod.name}`);

//
// readonly
//

class ClassWithReadonly {
    readonly name: string = "test";
    constructor(name: string) {
        this.name = name;
    }
    // setNameValue(name: string) {
    //     this.name = name;
    // }
}

class ClassWithAccessors {
    private _id: number = 0;
    get id(): number {
        console.log(`get id property`);
        return this._id;
    }
    set id(value: number) {
        console.log(`set id property`);
        this._id = value;
    }
}

let classWithAccessors = new ClassWithAccessors();
classWithAccessors.id = 10;
console.log(`classWithAccessors.id = ${classWithAccessors.id}`);

// 
// static functions
//

class StaticFunction {
    static printTwo() {
        console.log(`2`)
    }
}

StaticFunction.printTwo();

//
// static properties
//

class StaticProperty {
    static count = 0;
    updateCount() {
        StaticProperty.count++;
    }
}

let firstInstance = new StaticProperty();
let secondInstance = new StaticProperty();

firstInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);

secondInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);


//
// namespaces
//

namespace FirstNameSpace {
    export class NameSpaceClass { }
    class NotExported { }
}

let nameSpaceClass = new FirstNameSpace.NameSpaceClass();
// let notExported = new FirstNameSpace.NotExported();


//
// interfaces extending classes
//


class BaseInterfaceClass {
    id: number = 0;
    print() {
        console.log(`this.id = ${this.id}`);
    }
}

interface IBaseInterfaceClassExt
    extends BaseInterfaceClass {
    setId(_id: number): void;
}

class ImplementsExt extends BaseInterfaceClass
    implements IBaseInterfaceClassExt {
    setId(id: number): void {
        this.id = id;
    }
}

