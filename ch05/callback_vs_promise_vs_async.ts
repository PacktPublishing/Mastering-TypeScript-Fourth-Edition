//
// callback syntax
//

import { delayedPromise } from "./async_and_await";

function invokeAsync(success: () => void, failure: () => void) {

}

function usingCallbacks() {
    function afterCallbackSuccess() {
        // execute when the callback succeeds
    }
    function afterCallbackFailure() {
        // execute when the callback fails
    }
    // call a function and provide both callbacks
    invokeAsync(afterCallbackSuccess, afterCallbackFailure);
    // code here does not wait for callback to execute
}


function usingPromises() {
    delayedPromise().then(
        () => {
            // execute on success
        }
    ).catch(
        () => {
            // execute on error
        }
    )
    // code here does not wait for promise to return
}

async function usingAsync() {
    try {
        await delayedPromise();
        // continue to next line of code on error
    } catch (error) {
        // execute on error
    }
    // code here waits for async call to complete
}

