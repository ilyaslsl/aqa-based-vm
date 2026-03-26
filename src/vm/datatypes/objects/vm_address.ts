import VMObject from "./vm_object"
import { VM_ADDRESS_TAG } from "./shared";
import type Register from "../register";
import VMInt from "./vm_int";

export default class VMAddress extends VMObject {
    object_type :  "any" | "register"
    value : any = new VMInt(0);
    [VM_ADDRESS_TAG] = true;

    constructor(type : "any" | "register", value : any) {
        super()
        this.object_type = type;
        this.value = value
    }

    toString() {
        switch(this.object_type) {
            case "register":
                return this.value.name
            case "any":
                return "?" // TODO: implement stuff!
        }
    }

    write(value : any) {
        if (this.object_type == "register")
            (this.value as Register).value = value;
    }

    read() {
        switch (this.object_type) {
            case "register":
                return (this.value as Register).value;
            case "any":
                return this.value 
        }
    }
    
}