import type { VM } from "../vm";
import type { Instruction } from "./instruction";
import type VMAddress from "./objects/vm_address";
import type VMInt from "./objects/vm_int";

const debug = (line : string) => {
    // console.log("[debug] " + line)
}

export const handleMov = (vm : VM, insn : Instruction) => {
    if(!insn.operands[0]!.isAddress()) {
        throw new Error(`Cannot move to something that isnt an address (op0!=address)`)
    }
    const address = insn.operands[0] as VMAddress
    let value = insn.operands[1]
    if (value?.isAddress())
        value = (value as VMAddress).read();

    address.write(value)
}

export const handleAdd = (vm : VM, insn : Instruction) => {
    if(!insn.operands[0]!.isAddress()) {
        throw new Error(`Cannot write to something that isnt an address (op0!=address)`)
    }
    const destination = insn.operands[0] as VMAddress
    let a = insn.operands[1]
    if (a?.isAddress())
        a = (a as VMAddress).read();

    let b = insn.operands[2]
    if (b?.isAddress())
        b = (b as VMAddress).read();

    if(!a?.isInt() || !b?.isInt())
        throw new Error("Cannot add " + a + " to " + b)

    const result = (a as VMInt).add(b as VMInt)
    destination.write(result)
}

export const handleSub = (vm : VM, insn : Instruction) => {
    if(!insn.operands[0]!.isAddress()) {
        throw new Error(`Cannot write to something that isnt an address (op0!=address)`)
    }
    const destination = insn.operands[0] as VMAddress
    let a = insn.operands[1]
    if (a?.isAddress())
        a = (a as VMAddress).read();

    let b = insn.operands[2]
    if (b?.isAddress())
        b = (b as VMAddress).read();

    if(!a?.isInt() || !b?.isInt())
        throw new Error("Cannot substract " + b + " to " + a)

    const result = (a as VMInt).substract(b as VMInt)
    destination.write(result)
}

export const handleOut = (vm : VM, insn : Instruction) => {
    let val = insn.operands[0]
    if (val?.isAddress())
        val = (val as VMAddress).read()

    if (val?.isInt())
        console.log((val as VMInt).value)
    else
        console.log(val)
}

export const handleJmp = (vm : VM, insn : Instruction) => {
    let val = insn.operands[0]
    if(!val?.isAddress()) 
        throw new Error("You must jump to an address :c")

    let address = val as VMAddress
    if(vm.labels[address.value]) {
        debug("jumping to label: " + address.value)
        vm.eip = vm.labels[address.value]! - 1 // Take in account for the eip increment
    } else {
        throw new Error("Unknown label " + address.value)
    }
}

export const handleCmp = (vm : VM, insn : Instruction) => {
    let a = insn.operands[0]
    if (a?.isAddress())
        a = (a as VMAddress).read();

    let b = insn.operands[1]
    if (b?.isAddress())
        b = (b as VMAddress).read();

    if(!a?.isInt() || !b?.isInt())
        throw new Error("Cannot compare " + b + " to " + a)

    let result = (a as VMInt).substract(b as VMInt)
    vm.memory.push(result)
    debug(`pushed cmp to stack: ${result.value}`)
}

export const handleJEQ = (vm : VM, insn : Instruction) => {
    let result = vm.memory.pop();
    if(!result.isInt())
        throw new Error("popped stack should be an int :/")

    let res = (result as VMInt).value
    if (res == 0)
        handleJmp(vm, insn)
}

export const handleJGT = (vm : VM, insn : Instruction) => {
    let result = vm.memory.pop();
    if(!result.isInt())
        throw new Error("popped stack should be an int :/")

    let res = (result as VMInt).value
    if (res > 0)
        handleJmp(vm, insn)
}

export const handleJLT = (vm : VM, insn : Instruction) => {
    let result = vm.memory.pop();
    if(!result.isInt())
        throw new Error("popped stack should be an int :/")

    let res = (result as VMInt).value
    if (res < 0)
        handleJmp(vm, insn)
}

export const handleJNE = (vm : VM, insn : Instruction) => {
    let result = vm.memory.pop();
    if(!result.isInt())
        throw new Error("popped stack should be an int :/")

    let res = (result as VMInt).value
    if (res != 0)
        handleJmp(vm, insn)
}

export const handleJGE = (vm: VM, insn: Instruction) => {
    let result = vm.memory.pop();
    if (!result.isInt())
        throw new Error("popped stack should be an int :/");

    let res = (result as VMInt).value;

    if (res >= 0)
        handleJmp(vm, insn);
};

export const handleJLE = (vm: VM, insn: Instruction) => {
    let result = vm.memory.pop();
    if (!result.isInt())
        throw new Error("popped stack should be an int :/");

    let res = (result as VMInt).value;

    if (res <= 0)
        handleJmp(vm, insn);
};

export const handleHalt = (vm : VM, insn : Instruction) => {
    vm.halted = true;
}

export const HANDLERS = {
    "mov": handleMov,
    "add": handleAdd,
    "sub": handleSub,
    "out": handleOut,
    "b": handleJmp,
    "cmp": handleCmp,
    "beq": handleJEQ,
    "bgt": handleJGT,
    "blt": handleJLT,
    "bne": handleJNE,
    "halt": handleHalt,

    // Added stuff (jump if >= and jump if <=)
    "bge": handleJGE,
    "ble": handleJLE,
    
}