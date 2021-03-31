function hasValueNoWhiteSpace(value: string): boolean {
    if (
        value &&
        value.length > 0 &&
        value.trim().length > 0) {
        return true;
    }
    return false;
}


function testUsing<T>
    (values: T[], func: Function) {
    for (let value of values) {
        func.apply(Object, [value]);
    }
}

describe("data driven tests", () => {

    [1, 2, 3, 4]
        .forEach((value: number) => {
            it(`${value} should be less than 5`, () => {
                expect(value).toBeLessThan(5);
            })
        });

    testUsing(
        [
            [undefined, false],
            [null, false],
            [" ", false],
            ["  ", false],
            [" a ", true]
        ]
        , ([value, isValid]: [string, boolean]) => {

            it(`"${value}" hasValueNoWhiteSpace ? ${isValid}`, () => {
                isValid ?
                    expect(hasValueNoWhiteSpace(value)).toBeTruthy() :
                    expect(hasValueNoWhiteSpace(value)).toBeFalsy();
            });

        });

});

