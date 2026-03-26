import { isConstructorDeclaration } from "typescript";
import VMInt from "./objects/vm_int";
import type VMObject from "./objects/vm_object";
import { VM } from "../vm";
import VMAddress from "./objects/vm_address";
import { HANDLERS } from "./insn_handler";

export class Instruction {
    line: string;
    operands: VMObject[];
    type: string;
    constructor(vm: VM, line: string) {
        this.line = line;
        this.type = (this.line.split(" ")[0] as string).toLowerCase();
        this.operands = [];

        for (let op of this.line.split(" ")[1]?.split(",") as string[]) {
            if (op.startsWith("#")) {
                this.operands.push(new VMInt(Number.parseInt(op.substring(1))))
            } else if (Object.keys(vm.registers).includes(op)) {
                this.operands.push(new VMAddress("register", (vm.registers as any)[op]))
            } else {
                this.operands.push(new VMAddress("any", op))
            }
        }
    }

    handle(vm : VM) {
        if(!Object.keys(HANDLERS).includes(this.type)) {
            throw new Error("Unknown instruction " + this.type)
        }

        (HANDLERS as any)[this.type](vm, this)
    }

    toString() {
        return `${this.type} ${this.operands.map(x => x.toString()).join(',')}`;
    }
}