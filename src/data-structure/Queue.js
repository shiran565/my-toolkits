class Queue{
    constructor(){
        this.items = []
    }

    enqueue(value){
        return this.items.push(value)
    }

    dequeye(){
        return this.items.shift()
    }

    front(){
        return this.items[0]
    }

    size(){
        return this.items.length
    }

    clear(){
        this.items = []
    }
}