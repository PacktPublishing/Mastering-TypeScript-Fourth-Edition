//
// decorator syntax
//

function simpleDecorator(constructor: Function) {
    console.log('simpleDecorator called');
}

@simpleDecorator
class ClassWithSimpleDecorator {

}

let instance_1 = new ClassWithSimpleDecorator();
let instance_2 = new ClassWithSimpleDecorator();

console.log(`instance_1 : ${JSON.stringify(instance_1)}`);
console.log(`instance_2 : ${JSON.stringify(instance_2)}`);

// 
// multiple decorators
//

function secondDecorator(constructor: Function) {
    console.log(`secondDecorator called`);
}

@simpleDecorator
@secondDecorator
class ClassWithMultipleDecorators {

}

//
// Types of Decorators
//

function classDecorator(
    constructor: Function) { }

function propertyDecorator(
    target: any,
    propertyKey: string) { }

function methodDecorator(
    target: any,
    methodName: string,
    descriptor?: PropertyDescriptor) { }

function parameterDecorator(
    target: any,
    methodName: string,
    parameterIndex: number) { }

@classDecorator
class ClassWithAllTypesOfDecorators {
    @propertyDecorator
    id: number = 1;

    @methodDecorator
    print() { }

    setId(@parameterDecorator id: number) { }
}

//
// decorator factories
//

function decoratorFactory(name: string) {
    return (constructor: Function) => {
        console.log(`decorator function called with : ${name}`);
    }
}

@decoratorFactory('testName')
class ClassWithDecoratorFactory {

}

//
// class decorators
//

function classConstructorDec(constructor: Function) {
    console.log(`constructor : ${constructor}`);
    constructor.prototype.testProperty = "testProperty_value";
}

@classConstructorDec
class ClassWithConstructor {
    constructor(id: number) { }
}

let classInstance = new ClassWithConstructor(1);
console.log(`classInstance.testProperty = 
    ${(<any>classInstance).testProperty}`);


// 
// property decorators
// 

function propertyDec(target: any, propertyName: string) {
    // console.log(`target : ${target}`);
    // console.log(`target.constructor : ${target.constructor}`);

    if (typeof (target) === 'function') {
        console.log(`class name : ${target.name}`);
    } else {
        console.log(`class name : `
            + `${target.constructor.name}`);
    }

    console.log(`propertyName : ${propertyName}`);
}

class ClassWithPropertyDec {
    @propertyDec
    nameProperty: string | undefined;
}

//
// static property decorators
//

class StaticClassWithPropertyDec {
    @propertyDec
    static staticProperty: string;
}

//
// method decorators
//

function methodDec(target: any,
    methodName: string,
    descriptor?: PropertyDescriptor) {
    console.log(`target: ${target}`);
    console.log(`methodName : ${methodName}`);
    console.log(`descriptor : ${JSON.stringify(descriptor)}`);

    console.log(`target[methodName] : ${target[methodName]}`);
}

class ClassWithMethodDec {
    @methodDec
    print(output: string) {
        console.log(`ClassWithMethodDec.print`
            + `(${output}) called.`);
    }
}

//
// using method decorators
//

function auditLogDec(target: any,
    methodName: string,
    descriptor?: PropertyDescriptor) {

    let originalFunction = target[methodName];

    let auditFunction = function (this: any) {
        console.log(`1. auditLogDec : overide of `
            + ` ${methodName} called`);
        for (let i = 0; i < arguments.length; i++) {
            console.log(`2. arg : ${i} = ${arguments[i]}`);
        }
        originalFunction.apply(this, arguments);
    }

    target[methodName] = auditFunction;
    return target;
}

class ClassWithAuditDec {
    @auditLogDec
    print(arg1: string, arg2: string) {
        console.log(`3. ClassWithMethodDec.print`
            + `(${arg1}, ${arg2}) called.`);
    }
}

let auditClass = new ClassWithAuditDec();
auditClass.print("test1", "test2");

//
// parameter decorators
//

function parameterDec(target: any,
    methodName: string,
    parameterIndex: number) {

    console.log(`target: ${target}`);
    console.log(`methodName : ${methodName}`);
    console.log(`parameterIndex : ${parameterIndex}`);

}

class ClassWithParamDec {
    print(@parameterDec value: string) {
    }
}

// 
// decorator metadata
//

function metadataParameterDec(
    target: any,
    methodName: string,
    parameterIndex: number
) { }

class ClassWithMetadata {
    print(
        @metadataParameterDec id: number, name: string
    ) { }
}

//
// using decorator metadata
//

import 'reflect-metadata';

function reflectParameterDec(target: any,
    methodName: string,
    parameterIndex: number) {

    let designType = Reflect.getMetadata(
        "design:type", target, methodName);
    console.log(`design type: ${designType.name}`)

    let designParamTypes = Reflect.getMetadata(
        "design:paramtypes", target, methodName);
    for (let paramType of designParamTypes) {
        console.log(`param type : ${paramType.name}`);
    }

    let designReturnType = Reflect.getMetadata(
        "design:returntype", target, methodName);
    console.log(`return types : ${designReturnType.name}`);
}


class ClassWithReflectMetaData {
    print(
        @reflectParameterDec
        id: number,
        name: string): number {
        return 1000;
    }
}



