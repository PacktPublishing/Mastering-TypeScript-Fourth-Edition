//
// optional parameters
//

function concatValues(a: string, b?: string) {
    console.log(`a + b = ${a + b}`);
}

concatValues("first", "second");
concatValues("third");

//
// default parameters
//

function concatWithDefault(a: string, b: string = "default") {
    console.log(`a + b = ${a + b}`);
}

concatWithDefault("first", "second");
concatWithDefault("third");

//
// rest parameters
//

function testArguments(...args: string[] | number[]) {
    for (let i in args) {
        console.log(`args[${i}] = ${args[i]}`);
    }
}

testArguments("1");
testArguments(10, 20);

function myCallback(text: string): void {
    console.log(`myCallback called with ${text}`);
}

function withCallbackArg(
    message: string,
    callbackFn: (text: string) => void
) {
    console.log(`withCallback called, message : ${message}`);
    callbackFn(`${message} from withCallback"`);
}

withCallbackArg("initial text", myCallback);
// withCallbackArg("text", "this is not a function");

//
// function overrides
//

function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: any, b: any) {
    return a + b;
}

add("first", "second");
add(1, 2);
// add(true, false);


//
// string literals
//

type AllowedStringValues = "one" | "two" | "three";
type AllowedNumericValues = 1 | 20 | 65535;

function withLiteral(input:
    AllowedStringValues | AllowedNumericValues) {
    console.log(`called with : ${input}`);
}

withLiteral("one")
withLiteral("two");
withLiteral("three");
withLiteral(65535);

// withLiteral("four");
// withLiteral(2);




