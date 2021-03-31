var test = "a string";
console.log("test = " + test);

test = 1;
console.log("test = " + test);

test = function (a, b) {
    return a + b;
}
console.log("test = " + test);

function calculate(a, b, c) {
    return (a * b) + c;
}

console.log("calculate() = " + calculate(2, 3, 1));
console.log("calculate() = " + calculate("2", "3", "1"));


