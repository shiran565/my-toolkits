class Stack{
    constructor(){
        this.items = []
    }

    push(value){
        return this.items.push(value)
    }

    pop(){
        return this.items.pop()
    }

    top(){
        return this.items[this.items.length-1]
    }
    
    size(){
        return this.items.length
    }

    clear(){
        this.items = []
    }
}