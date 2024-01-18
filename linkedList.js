"use strict";
class ListNode {
    constructor(value) {
        this.next = null;
        this.value = value;
        this.next = null;
    }
}
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    append(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            // Wenn die Liste leer ist, setze head und tail auf den neuen Node
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            // Fügt den neuen Node am Ende der Liste ein und setze den tail auf den neuen Node
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }
}
const linkedList = new SinglyLinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
console.log(linkedList);
//# sourceMappingURL=linkedList.js.map