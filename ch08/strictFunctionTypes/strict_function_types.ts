// let numberOrString: number | string;

// let numberOnly: number = numberOrString;

function withCallback(
    fn: (a: number | string) => void
) {
    fn("test");
}

function withNumberOnly(a: number) {
    console.log(`a : ${a}`);
}

withCallback(withNumberOnly);

//

class WithPrint {
    print() { }
}

class WithPrintAndRun extends WithPrint {
    run() { }
}

function usePrint(
    fn: (withPrint: WithPrint) => void
) {
    let withPrint = new WithPrint();
    fn(withPrint);
}

usePrint((withRun: WithPrintAndRun) => {
    withRun.run();
});

