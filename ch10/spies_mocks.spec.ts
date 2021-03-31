
class MyCallbackClass {
    executeCallback(
        value: string,
        callbackFn: (value: string) => null) {
        console.log(`executeCallback invoking callbackFn`);
        callbackFn(value);
    }
}

class MySpiedClass {
    testFunction() {
        console.log(`testFunction() called`);
        this.testSpiedFunction();
    }
    testSpiedFunction() {
        console.log(`testSpiedFunction called`)
    }
}

class MyMockedClass {
    functionToBeMocked(): number {
        return 5;
    }
}



describe("spies and mocks", () => {

    it("should mock callback function", () => {
        let mock = jest.fn();

        let myCallbackClass = new MyCallbackClass();
        myCallbackClass.executeCallback('test', mock);

        expect(mock).toHaveBeenCalled();
    });


    it("should call testFunction with argument using mock", () => {
        let mock = jest.fn();

        let myCallbackClass = new MyCallbackClass();
        myCallbackClass.executeCallback("argument_1", mock);
        expect(mock).toHaveBeenCalledWith("argument_1");
    });

    it("should call testSpiedFunction", () => {
        let mySpiedClass = new MySpiedClass();
        const testFunctionSpy = jest.spyOn(
            mySpiedClass, 'testSpiedFunction');

        mySpiedClass.testFunction();
        expect(testFunctionSpy).toHaveBeenCalled();
    });

    it("should call mock of testFunction", () => {
        let mySpiedClass = new MySpiedClass();
        const testFunctionSpy = jest.spyOn(
            mySpiedClass, 'testFunction')
            .mockImplementation(() => {
                console.log(`mockImplementation called`);
            });

        mySpiedClass.testFunction();
        expect(testFunctionSpy).toHaveBeenCalled();
    });

    it("should return value from mocked", () => {
        let myMockedClass = new MyMockedClass();
        jest.spyOn(myMockedClass, 'functionToBeMocked')
            .mockImplementation((): number => {
                return 10;
            });

        expect(myMockedClass.functionToBeMocked()).toEqual(10);
    });


})

