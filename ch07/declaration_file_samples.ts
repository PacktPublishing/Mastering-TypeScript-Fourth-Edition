//
// function overrides
//


trace("trace with string");
trace(true);
trace(1);
trace({ id: 1, name: "test" });

//
// nested namespaces
//

FirstNamespace.SecondNamespace.ThirdNamespace.log("test");

//
// interfaces
// 

let myIdName: IIdName = { id: 1, name: "test" };

//
// classes
//

let myClass = new MyModuleClass();
myClass.print();

//
// static classes
//

MyModuleStatic.id = 10;
MyModuleStatic.print();

//
// abstract classes
//

class DerivedFromAbstract extends MyModuleAbstract {
    print() { }
}

//
// generics
//

let sortedStringArray: Array<string> = sort(["first", "second"]);
let sortedNumericArray: Array<number> = sort([1, 2, 3]);

//
// distributed conditional types
//

type myNever = stringOrNumberOrBoolean<[string, number]>;

//
// conditional type inference
//

type myString = inferFromPropertyType<{ id: string }>;
type myNumber = inferFromPropertyType<{ id: number }>;
