function throwsError() {
    throw new Error("this is an error");
}

describe("test matchers", () => {
    it("should match with toBe", () => {
        expect(1).toBe(1);
    });

    it("should match with toBe using assignment", () => {
        let objA = { id: 1 };
        let objB = objA;
        expect(objA).toBe(objB);
    });

    it("should match with toBe", () => {
        let objA = { id: 1 };
        let objB = { id: 1 };
        expect(objA).not.toBe(objB);
    });

    it("should match with toEqual", () => {
        let objA = { id: 1 };
        let objB = { id: 1 };
        expect(objA).toEqual(objB);
    });

    it("should contain a value", () => {
        expect("abcde").toContain("cde");
    });

    it("should contain an array item", () => {
        let objArray = [
            { id: 1 },
            { id: 2 }
        ];
        expect(objArray).toContainEqual({ id: 2 });
    });

    it("should not contain a value", () => {
        expect("abcde").not.toContain("123");
    });

    it("should throw an error", () => {
        expect(() => { throwsError() }
        ).toThrowError(new Error("this is an error"));
    });

});

