mov R1,#0
mov R0,R1
L0:
mov R2,#100
cmp R0,R2
bgt L1
out R0
mov R3,#2
add R4,R0,R3
mov R0,R4
b L0
L1: