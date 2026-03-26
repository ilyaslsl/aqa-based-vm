import { isThrowStatement } from "typescript";
import type Address from "./objects/vm_address";
import type VMObject from "./objects/vm_object";

export default class Stack {
    data = [] as VMObject[];
    constructor() {

    }

    push(obj : VMObject) {
        this.data.push(obj)
    }

    pop() : VMObject {
        if (this.data.length == 0)
            throw new Error(`Can not pop empty stack?`)

        let obj = this.data.pop();

        if (obj == null)
            throw new Error("popped stack object is null")
        
        return obj
    }
}