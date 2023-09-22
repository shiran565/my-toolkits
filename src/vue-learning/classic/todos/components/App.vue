<template>
    <div class="todos-app">
        <h2 class="title">TODO LIST</h2>
        <div class="todos-form">
            <input type="text" placeholder="Add a Todo" @keyup.enter="addTodo">
        </div>
        <ul class="todos-list">
            <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo"></TodoItem>
        </ul>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import TodoItem from './TodoItem.vue'
export default {
    data() {
        return {
        }
    },
    components: {
        TodoItem
    },
    computed: {
        todos() {
            return this.$store.state.todos
        }
    },
    methods: {
        ...mapActions(['addTodo', 'removeTodo']),
        addTodo(e) {
            const text = e.target.value || ''
            if (text.trim()) {
                this.$store.dispatch('addTodo', text)
            }
            e.target.value = ''
        }
    }
}


</script>

<style scoped>
    .todos-app{
        width:600px;
        margin:0 auto;
    }

    .title{
        margin-top: 50px;
        text-align: center;
    }

    .todos-form{
        text-align: center;

        input{
            width:500px;
        }
    }
    .todos-list li{
        list-style: none;
    }
</style>
