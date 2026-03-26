# AK VM

This project, written over the course of a few hours was an idea I got from a CS High School class, we had to "learn" assembly, and our teacher chose for some reason to teach us the AQA instruction set.
We had to use [this website](https://www.peterhigginson.co.uk/AQA/) which in my opinion did not look that great.

So, whats the obvious solution to this issue? write my own AQA emulator, to be able to run the same code on my VM instead of this website's vm.
Almost all opcodes are correctly working, let me know if you find any issue as this was written really quickly. Right now there's registers 0 to 6 but you can add all the ones easily by just modifying [this file](https://github.com/ilyaslsl/aqa-based-vm/blob/main/src/vm/vm.ts)

### Instruction set based on AQA

| Opcode | Description | Usage
| --- | --- | ---
| mov | write a constant, or copy data from a register to another | mov R0,#5
| add | add two ints and write to a destination register | add R2,R0,R1 
| sub | same as add but for substracting | sub R2,R0,R1 
| out | prints a register or a constant to the console | out R0
| b | jump to a label | b L2
| cmp | compare two ints and write result to stack | cmp R0, R1
| beq | takes the last compare value and jump if equal | beq L1
| bne | takes the last compare value and jump if not equal | bne L1
| bgt | takes the last compare value and jump if bigger than | bgt L1
| blt | takes the last compare value and jump if lower than | blt L1

### Additional instructions
| Opcode | Description | Usage
| --- | --- | ---
| bge | takes the last compare value and jump if bigger than or equal | bge L1
| ble | takes the last compare value and jump if lower than or equal | ble L1
