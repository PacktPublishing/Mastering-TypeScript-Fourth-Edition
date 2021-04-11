//
// callbacks
//

function delayedResponseWithCallback(callback: () => void) {
    function executeAfterTimeout() {
        console.log(`5. executeAfterTimeout()`);
        callback();
    }
    console.log(`2. calling setTimeout`)
    setTimeout(executeAfterTimeout, 1000);
    console.log(`3. after calling setTimeout`)
}

function callDelayedAndWait() {
    function afterWait() {
        console.log(`6. afterWait()`);
    }
    console.log(`1. calling delayedResponseWithCallback`);
    delayedResponseWithCallback(afterWait);
    console.log(`4. after calling delayedResponseWithCallback`)
}

callDelayedAndWait();

