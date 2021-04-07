//
// interface inheritance
//

interface IBase {
    id: number;
}

interface IDerivedFromBase extends IBase {
    name: string;
}

class IdNameClass implements IDerivedFromBase {
    id: number = 0;
    name: string = "nameString";
}

interface IBaseStringOrNumber {
    id: string | number;
}

interface IDerivedFromBaseNumber
    extends IBaseStringOrNumber {
    id: number;
}

interface IMultiple
    extends IDerivedFromBase,
    IDerivedFromBaseNumber {
    description: string;
}

let multipleObject: IMultiple = {
    id: 1,
    name: "myName",
    description: "myDescription"
};

//
// class inheritance
//


class BaseClass implements IBase {
    id: number = 0;
}

class DerivedFromBaseClass
    extends BaseClass
    implements IDerivedFromBase {
    name: string = "nameString";
}

//
// implementing multiple interfaces
//

interface IFirstInterface {
    id: number;
}

interface ISecondInterface {
    name: string;
}

class MultipleInterfaces
    implements IFirstInterface, ISecondInterface {
    id: number = 0;
    name: string = "nameString";
}

// 
// the super keyword 
//

class BaseClassWithCtor {
    private id: number;
    constructor(id: number) {
        this.id = id;
    }
}

class DerivedClassWithCtor extends BaseClassWithCtor {
    private name: string;
    constructor(id: number, name: string) {
        super(id);
        this.name = name;
    }
}

let derivedClassInstance = new DerivedClassWithCtor(1, "test");

//
// function overriding 
//

class BaseClassWithFn {
    print(text: string) {
        console.log(`BaseClassWithFn.print() : ${text}`)
    }
}

class DerivedClassFnOverride extends BaseClassWithFn {
    print(text: string) {
        console.log(`DerivedClassFnOverride.print(${text})`);
    }
}

let derivedClassFnOverride = new DerivedClassFnOverride();
derivedClassFnOverride.print("test");

class DerivedClassFnCallthrough extends BaseClassWithFn {
    print(text: string) {
        super.print(`from DerivedClassFncallthrough : ${text}`);
    }
}

let derivedCallthrough = new DerivedClassFnCallthrough();
derivedCallthrough.print("text");

//
// protected
//

class BaseClassProtected {
    protected id: number;
    private name: string = "";
    constructor(id: number) {
        this.id = id;
    }
}

class AccessProtected extends BaseClassProtected {
    constructor(id: number) {
        super(id);
        console.log(`base.id = ${this.id}`);
        // console.log(`base.name = ${this.name}`);
    }
}

let accessProtected = new AccessProtected(1);
// accessProtected.id = 1;
// accessProtected.name = "test";



//
// abstract classes
//

abstract class EmployeeBase {
    public id: number;
    public name: string;
    abstract doWork(): void;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
// class OfficeWorker extends EmployeeBase {
// }

// class OfficeManager extends OfficeWorker {
//     public employees: OfficeWorker[] = [];
// }

class OfficeWorker extends EmployeeBase {
    doWork() {
        console.log(`${this.name} : doing work`);
    }
}

class OfficeManager extends OfficeWorker {
    public employees: OfficeWorker[] = [];
    manageEmployees() {
        super.doWork();
        for (let employee of this.employees) {
            employee.doWork();
        }
    }
}

let joeBlogg = new OfficeWorker(1, "Joe");
let jillBlogg = new OfficeWorker(2, "Jill")
let jackManager = new OfficeManager(3, "Jack");

jackManager.employees.push(joeBlogg);
jackManager.employees.push(jillBlogg);

jackManager.manageEmployees();

//
// instanceof
//

class A { }
class BfromA extends A { }
class CfromA extends A { }
class DfromC extends CfromA { }

console.log(`A instance of A : 
    ${new A() instanceof A}`);

console.log(`BfromA instance of A : 
    ${new BfromA() instanceof A}`);

console.log(`BfromA instance of BfromA : 
    ${new BfromA() instanceof BfromA}`);

console.log(`CfromA instance of BfromA : 
    ${new CfromA() instanceof BfromA}`);

console.log(`DfromC instance of CfromA : 
    ${new DfromC() instanceof CfromA}`);

console.log(`DfromC instance of A : 
    ${new DfromC() instanceof A}`);

