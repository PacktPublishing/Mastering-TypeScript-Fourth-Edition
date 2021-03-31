//
// declaration file typing
//

//
// function overrides
//

declare function trace(arg: string | number | boolean);
declare function trace(arg: { id: number; name: string });

//
// nested namespaces
//

declare module FirstNamespace {
    module SecondNamespace {
        module ThirdNamespace {
            function log(msg: string);
        }
    }
}

// 
// interfaces
//

declare interface IIdName {
    id: number;
    name: string;
}


// 
// classes
//

declare class MyModuleClass {
    public print(): void;
    private id: number;
}

// 
// static classes properties
//

declare class MyModuleStatic {
    static print(): void;
    static id: number;
}

//
// abstract classes
//

declare abstract class MyModuleAbstract {
    abstract print(): void
}

// 
// generics
//

declare function sort<T extends number | string>
    (input: Array<T>): Array<T> { }

//
// distributed conditional types
//

declare type stringOrNumberOrBoolean<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean : never;

//
// conditional type inference
//

declare type inferFromPropertyType<T> =
    T extends { id: infer U } ? U : never;


