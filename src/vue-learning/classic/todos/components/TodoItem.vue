<template>
    <li class="todo-item">
        <input type="checkbox" @change="toggleTodo(todo)" :checked="todo.done">
        <span class="todo-item-text">{{ todo.text }}</span>
        <button @click="remove(todo)">X</button>
    </li>
</template>

<script>
export default {
    props: ['todo'],
    methods: {
        remove(todo) {
            this.$store.dispatch('removeTodo', todo)
        },
        toggleTodo(todo) {
            todo.done = !todo.done
            this.$store.dispatch('toggleTodo', todo)
        }
    }
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