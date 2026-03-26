import { VM_INT_TAG } from "./shared";
import VMObject from "./vm_object";

export default class VMInt extends VMObject {
    value : number
    [VM_INT_TAG] = true;

    constructor (value :number) {
        super()
        this.value = value;
    }

    toString() {
        return `#${this.value}`
    }
    
    add(b : VMInt) {
        return new VMInt(this.value + b.value);
    }

    substract(b : VMInt) {
        return new VMInt(this.value - b.value);
    }
}