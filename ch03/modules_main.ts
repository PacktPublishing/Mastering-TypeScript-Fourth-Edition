// 
// importing modules
//

import { Module1 } from "./modules/Module1";

let mod1 = new Module1();
mod1.print();

//
// module renaming
//

import { Module1 as MyMod1 } from "./modules/Module1";

let myRenamedMod = new MyMod1();
myRenamedMod.print();

//
// multiple exports
//

import { MultipleClass1, MultipleClass2 }
    from "./modules/MultipleExports";

let mc1 = new MultipleClass1();
let mc2 = new MultipleClass2();

// 
// module namespaces
//

import * as MultipleExports from "./modules/MultipleExports";

let meMc1 = new MultipleExports.MultipleClass1();
let meMc2 = new MultipleExports.MultipleClass2();


//
// default exports
//

import DefaultAdd, { ModuleNonDefaultExport }
    from "./modules/DefaultExport";

let modDefault = DefaultAdd(1, 2);

let modNonDefault = new ModuleNonDefaultExport();

