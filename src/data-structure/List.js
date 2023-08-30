class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);
    if (this.length == 0) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  insert(position, value) {
    if (position < 0 || this.length < position) {
      throw Exception("Index out of Length");
    }
    const node = new Node(value);
    if (position == 0) {
      //新节点插入到头节点之前
      node.next = this.head;
      this.head = node;
      if (length == 0) {
        this.tail = node;
      }
    } else if (position == this.length) {
      this.tail.next = node;
      this.tail = node;
    } else {
      let prev = this.head;
      //指针移动到前一个位置
      for (let i = 0; i < position - 1; i++) {
        prev = prev.next;
      }
      node.next = prev.next;
      prev.next = node;
    }
    this.length++;
  }

  delete(index) {
    if (index < 0 || index >= this.length) {
      throw Exception("Index out of Length");
    }
    //只有一个节点且的情况,清空列表即可节点
    if (this.length == 1) {
      this.head = this.tail = null;
      //删除头节点
    } else if (index == 0) {
      this.head = this.head.next;
    } else {
      let current,
        prev = (current = this.head);
      //指针移动到目标前一个节点
      for (let i = 0; i < index; i++) {
        prev = current;
        current = current.next;
      }
      //删除最后一个节点
      prev.next = current.next;
      if (index == this.length - 1) {
        this.tail = prev;
      }
    }
    this.length--;
  }

  toString() {
    let str = "[";
    let current = this.head;
    let length = this.length;
    if (!current) {
      return "";
    }

    while (current) {
      str += current.value + (current.next ? "," : "");
      current = current.next;
    }

    str += "]";
    return `length:${length},value:${str}`;
  }
}

//test use case
let list = new List();
list.append(2);
list.append(3);
list.append(5);
list.append(1);
console.log(list.toString());
list.insert(2, 8);
console.log(list.toString());
//list.insert(7,3)
//console.log(list.toString())
list.delete(2);
console.log(list.toString());
list.delete(3)
console.log(list.toString());
list.delete(0)
console.log(list.toString());
