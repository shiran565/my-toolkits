<template>
    <li class="todo-item">
        <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo)" />
        <span class="todo-item-text">{{todo.text}}</span>
        <button class="delete" @click="removeTodo(todo)">X</button>
    </li>
</template>
<script setup>
const props = defineProps(['todo'])
const emits = defineEmits(['toggleTodo', 'removeTodo'])

const removeTodo = (todo) => {
    //调用父组件的方法remove
    emits('removeTodo', todo)
}

const toggleTodo = (todo) => {
    emits('toggleTodo', todo)
}

</script>
<style scoped>
    .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .todo-item-text {
        flex: 1;
        margin-left: 10px;
    }
    .todo-item-text-title {
        font-size: 18px;
        font-weight: bold;
    }
    .todo-item-text-content {
        font-size: 14px;
        color: #6666;
    }
    .todo-item-text-content-time {
        font-size: 12px;
    }
       
</style>