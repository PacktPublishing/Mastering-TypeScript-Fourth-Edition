

//
// callback sytax
// 
import * as fs from "fs";

fs.readFile("./test1.txt", (err, data) => {
    if (err) {
        console.log(`an error occurred : ${err}`);
    } else {
        console.log(`test1.txt contents : ${data}`);
        fs.readFile("./test2.txt", (err, data) => {
            if (err) {
                console.log(`an error occurred : ${err}`);
            } else {
                console.log(`test2.txt contents : ${data}`);
                fs.readFile("./test3.txt", (err, data) => {
                    if (err) {
                        console.log(`an error occurred : ${err}`);
                    } else {
                        console.log(`test3.txt contents : ${data}`);
                    }
                })
            }
        })
    }
});

// 
// promise syntax
//

fs.promises.readFile("./test1.txt")
    .then((value) => {
        console.log(`ps test1.txt read : ${value}`);
        return fs.promises.readFile("./test2.txt");
    }).then((value) => {
        console.log(`ps test2.txt read : ${value}`);
        return fs.promises.readFile("./test3.txt");
    }).then((value) => {
        console.log(`ps test3.txt read : ${value}`);
    })
    .catch((error) => {
        console.log(`an error occurred : ${error}`);
    });


// 
// writing a promise
//

function fnDelayedPromise(
    resolve: () => void,
    reject: () => void) {
    function afterTimeout() {
        resolve();
    }
    setTimeout(afterTimeout, 1000);
}

function delayedResponsePromise(): Promise<void> {
    return new Promise<void>(fnDelayedPromise);
}

function delayedPromise(): Promise<void> {
    // return new Promise object
    return new Promise<void>
        ( // start constructor
            (
                resolve: () => void, // resolve function
                reject: () => void   // reject function
            ) => {
                // start of function definition
                function afterTimeout() {
                    resolve();
                }
                setTimeout(afterTimeout, 1000);
                // end of function definition
            }
        ); // end constructor
}

delayedPromise().then(() => {
    console.log(`delayed promise returned`);
}).catch(() => {
    console.log(`an error occurred`);
})


//
// promise errors
//

function errorPromise(): Promise<void> {
    return new Promise<void>(
        (   // constructor
            resolve: () => void,
            reject: () => void
        ) => {
            // function definition
            console.log(`2. calling reject()`);
            reject();
        }
    )
}

// console.log(`1. calling errorPromise()`);
// errorPromise().then(() => { })
//     .catch(() => { console.log(`3. caught an error`) });


//
// promise returning values
//

function promiseReturningString(throwError: boolean)
    : Promise<string> {
    return new Promise<string>(
        (
            resolve: (outputValue: string) => void,
            reject: (errorCode: number) => void
        ) => {
            if (throwError) {
                reject(101);
            }
            resolve(`resolve with message`);
        }
    )
}

console.log(`1. calling promiseReturningString`)

promiseReturningString(false)
    .then((returnValue: string) => {
        console.log(`2. returnedValue : ${returnValue}`);
    }).catch((errorCode: number) => {
        console.log(`this is not called`);
    });

console.log(`1. calling promiseReturningString (force error)`)

promiseReturningString(true)
    .then((returnValue: string) => {
        console.log(`this is not called`);
    })
    .catch((errorCode: number) => {
        console.log(`2. caught : ${errorCode}`);
    });

//
// promise syntax
//

interface IConnection {
    server: string;
    port: number;
}

interface IError {
    code: number;
    message: string;
}

interface IDataRow {
    id: number;
    name: string;
    surname: string;
}


function complexPromise(
    connection: IConnection,
    accessKey: string
)
    : Promise<IDataRow[]> {
    return new Promise<IDataRow[]>(
        (
            resolve: (results: IDataRow[]) => void,
            reject: (results: IError) => void
        ) => {
            // check the connection properties
            // connect to the database
            // retrieve data, or
            // reject with an error 
        }

    );
}

complexPromise({
    server: "test",
    port: 4200
}, "abcd").then((rows: IDataRow[]) => {
    // do something with rows
})
    .catch((error: IError) => {
        // do something with error
    });

