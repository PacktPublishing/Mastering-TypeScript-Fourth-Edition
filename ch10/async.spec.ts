
class MockAsync {
    executeSlowFunction(
        complete: (value: string) => void
    ) {
        setTimeout(() => {
            complete(`completed`);
        }, 1000);
    }
}


describe("failing async tests", () => {
    xit("should wait for callback to complete", () => {
        let mockAsync = new MockAsync();
        console.log(`1. calling executeSlowFunction`);
        let returnedValue !: string;
        mockAsync.executeSlowFunction((value: string) => {
            console.log(`2. complete called`);
            returnedValue = value;
        });
        console.log(`3. checking return value`);
        expect(returnedValue).toBe("completed")
    });
});

describe("async test with done ", () => {
    let returnedValue!: string;

    beforeEach((done: jest.DoneCallback) => {
        let mockAsync = new MockAsync();
        console.log(`1. calling executeSlowFunction`);
        mockAsync.executeSlowFunction((value: string) => {
            console.log(`2. executeSlowFunction returned`);
            returnedValue = value;
            done();
        })
    });

    it("should return value after 1 second", () => {
        console.log(`3. checking returnedValue`);
        expect(returnedValue).toEqual("completed");
    })
});

class AsyncWithPromise {
    delayedPromise(): Promise<string> {
        return new Promise<string>(
            (resolve: (str: string) => void,
                reject: (str: string) => void) => {
                setTimeout(() => {
                    console.log(`2. returning success`);
                    resolve("success");
                }, 1000)
            }
        )
    }
}

describe("async test", () => {
    it("should wait 1 second for promise to resolve", async () => {
        let asyncWithPromise = new AsyncWithPromise();
        console.log(`1. calling delayedPromise`);
        let returnValue = await asyncWithPromise.delayedPromise();
        console.log(`3. after await`);
        expect(returnValue).toEqual("success");
    })
});