import { Instruction } from "./datatypes/instruction";
import Register from "./datatypes/register";
import Stack from "./datatypes/stack";

export class VM {

    memory = new Stack();
    instructions = [] as Instruction[];
    registers = {
        "R0": new Register("R0"),
        "R1": new Register("R1"),
        "R2": new Register("R2"),
        "R3": new Register("R3"),
        "R4": new Register("R4"),
        "R5": new Register("R5"),
        "R6": new Register("R6"),
        
    }
    eip = 0;
    labels = {} as {[id : string] : number}

    constructor() {
        
    }

    parse(code : string) {
        for(let line of code.split("\n")) {
            if (line.length == 0)
                continue
            if (line.endsWith(":")) {
                const labelName = line.split(":")[0] as string
                console.log(`Label ${labelName} set to ${this.instructions.length}`)
                this.labels[labelName] = this.instructions.length 
                continue;
            }
            const insn = new Instruction(this, line);
            this.instructions.push(insn)
        }
        console.log(`Parsed ${this.instructions.length} instructions`)
    }

    step() {
        if (this.eip >= this.instructions.length) {
            throw new Error("eip >= code length?")
        }
        let current = this.instructions[this.eip]!;
        // console.log("Executing instruction:", current?.toString())

        current.handle(this);
        this.eip += 1;
    }
}