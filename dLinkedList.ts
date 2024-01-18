class ListNode<T> {
    value: T;
    next: ListNode<T> | null = null;
    prev: ListNode<T> | null = null;
  
    constructor(value: T) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }
  
  class DoublyLinkedList<T> {
    head: ListNode<T> | null = null;
    tail: ListNode<T> | null = null;
    length: number = 0;
  
    constructor() {}
  
    append(value: T): void {
      const newNode = new ListNode(value);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
  
      this.length++;
    }
  }
  
  const linkedList = new DoublyLinkedList<number>();
  linkedList.append(1);
  linkedList.append(2);
  linkedList.append(3);
  
  console.log("Doubly Linked List:", linkedList);
  