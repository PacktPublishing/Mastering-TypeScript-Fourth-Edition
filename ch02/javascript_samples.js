
//
// The any keyword
//

var item1 = { id: 1, name: "item 1" };
item1 = { id: 2 };


//
// definite assignment sample
//

console.log("aValue = " + aValue);
var aValue = 1;
console.log("aValue = " + aValue);

function printValue(value) {
    console.log("value = " + value);
}

printValue("test");
printValue();

var value;

function printObject(obj) {
    console.log("id :" + obj.id);
    console.log("name : " + obj.name);
}

printObject({ id: 1 })

var objectA = {
    nestedProperty: {
        name: "nestedPropertyName"
    }
}

function printNestedObject(obj) {
    console.log("obj.nestedProperty.name = "
        + obj.nestedProperty.name);
}

printNestedObject(objectA);
console.log("calling printNestedObject");
// printNestedObject({});
// console.log("completed");

function printNestedWithChecks(obj) {

}

//
// optional javascript parameters
//

function testArguments() {
    for (var i = 0; i < arguments.length; i++) {
        console.log("argument[" + i + "] = " + arguments[i]);
    }
}

testArguments(1, 2);
testArguments("first", "second", "third");

//
// callback functions
//

var myCallback = function (text) {
    console.log("myCallback called with " + text);
}

function withCallbackArg(message, callbackFn) {
    console.log("withCallback called, message : " + message);
    callbackFn(message + " from withCallback");
}

withCallbackArg("initial text", myCallback);

withCallbackArg("text", "this is not a function");