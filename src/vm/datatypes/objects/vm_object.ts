import { VM_ADDRESS_TAG, VM_INT_TAG } from "./shared";

export default class VMObject {
    isAddress() { 
        return (this as any)[VM_ADDRESS_TAG] == true;
    }
    isInt() {
        return (this as any)[VM_INT_TAG] == true;
    }
}