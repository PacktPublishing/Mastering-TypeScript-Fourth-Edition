interface IFilterable {
    name?: string;
}

function filterUndefined<T extends IFilterable>
    (input: Array<T>): Array<T> {
    let output: Array<T> = [];
    for (let item of input) {
        if (item.name?.length) {
            output.push(item);
        }
    }
    return output;
}