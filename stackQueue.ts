class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Queue<T> {
  first: QueueNode<T> | null = null;
  last: QueueNode<T> | null = null;
  size: number = 0;

  constructor() {}

  enqueue(value: T): void {
    const newNode = new QueueNode(value);

    if (!this.first) {
      // Wenn die Queue leer ist, setze first und last auf den neuen Node
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last!.next = newNode;
      this.last = newNode;
    }

    
    this.size++;
  }

  dequeue(): T | null {
    if (!this.first) {
      // Wenn die Queue leer ist, gib null zurück
      return null;
    }

    const value = this.first.value;

    this.first = this.first.next;

    // Reduziere die Größe der Queue um 1
    this.size--;

    // Wenn die Queue jetzt leer ist, setze auch den last auf null
    if (!this.first) {
      this.last = null;
    }

    return value;
  }
}

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue);
console.log(queue.dequeue());
console.log(queue);
