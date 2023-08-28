class Node{
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {

    constructor() {
        this.head = null;
    }

    add(value){
        const node = new Node(value);
        if(!this.head){
            this.head = node
        }

        const current = this.head
        while(current.next){
            current = current.next
        }
        current.next = node;
        return node;
    }

    get(index){
        const current = this.head
        while(index>0){
            current = current.next
            if(!current.next)
            break;
            i--;
        }
        return current;
    }

    insert(index, value) {
        if (index < 0 || index > this.length) {
            return;
        }
        var node = new Node(value);
        if (!this.head){

        }
    }

    delete(index){
        if (index < 0 || index > this.length) {
            return;
        }
        if (index === 0) {
            this.head = this.head.next;
            this.length--;
            return;
        }
        var current = this.head;
        var previous = null;
        for (var i = 0; i < index; i++) {
            previous = current;
            current = current.next;
        }
        previous.next = current.next;
        this.length--;
        return;
    }
}