import { VM } from "./vm/vm";
import fs from "fs"

const vm = new VM();
let code = fs.readFileSync("tests/code.asm").toString()

vm.parse(code)

while(vm.eip < vm.instructions.length && !vm.halted)
    vm.step();


console.log("---------------")
console.log("Done!")
console.log("---------------")