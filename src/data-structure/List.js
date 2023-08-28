class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class List {

    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    append(value) {
        const node = new Node(value);
        if (!this.length == 0) {
            this.head = this.tail = node
        }else{
            this.tail.next = node
            this.tail = node
        }
        this.length++
    }
    
    insert(position,value){
        if(position < 0 || this.length < position ){
            throw Exception("Index out of Length")
        }
        const node = new Node(value)
        if(position == 0){
            //新节点插入到头节点之前
            node.next = this.head
            this.head = node
            if(length =0){
                this.tail = node
            }
        }else if(position == this.length){
            this.tail.next = node
            this.tail = node
        }else{
            const prev = this.head
            //指针移动到前一个位置
            for(let i=0;i<position-1;i++){
                prev = prev.next
            }
            node.next = prev.next
            prev.next = node
        }
        this.length++
    }

    toString(){
        let str = "["
        const current = this.head
        if(!current){
            return ""
        }
        while(current.next){
            str += current.value +","
        }

        str+= "]"
        return str
    }
}

let list = new List()
//list.append(2)
//list.append(3)
//list.append(5)
//list.append(1)
console.log(list.toString())