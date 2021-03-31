//
// exporting modules
//

export class Module1 {
    print(): void {
        localPrint(`Module1.print() called`);
    }
}

function localPrint(text: string) {
    console.log(`localPrint: ${text}`);
}