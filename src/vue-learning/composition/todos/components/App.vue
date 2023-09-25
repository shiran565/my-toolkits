<template>
    <div class="todos-app">
        <h2 class="title">TODO LIST</h2>
        <div class="todos-form">
            <input type="text" placeholder="Add a Todo" @keyup.enter="addTodo">
        </div>
        <ul class="todos-list">
            <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" @toggleTodo="toggleTodo"
                @removeTodo="removeTodo"></TodoItem>
        </ul>
    </div>
</template>
<script setup>
import TodoItem from './TodoItem.vue';
import { useStore } from 'vuex'
const store = useStore();
const todos = store.state.todos;

const addTodo = (text) => {
    store.dispatch('addTodo', {
        text,
        done: false
    })
}

const toggleTodo = (todo) => {
    store.dispatch('toggleTodo', todo);
}

const removeTodo = (todo) => {
    store.dispatch('removeTodo', todo);
}

</script>

<style scoped>
.todos-app {
    width: 600px;
    margin: 0 auto;
}

.title {
    margin-top: 50px;
    text-align: center;
}

.todos-form {
    text-align: center;

    input {
        width: 500px;
    }
}

.todos-list li {
    list-style: none;
}
</style>