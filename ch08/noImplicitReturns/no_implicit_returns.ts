function isLargeNumber(value: number): boolean {
    if (value > 1_000_000)
        return true;
    return false;
}

console.log(`isLargeNumber(1) : ${isLargeNumber(1)}`);
