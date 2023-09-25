export const STORAGE_KEY = "todos-vuejs";

export const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo);
  },
  removeTodo(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },
  /**
   * 这个方法写得很巧妙，直接通过赋默认值的方式巧妙地实现更新传入的属性
   * @param {Object} state 
   * @param {Object} todo 
   */
  editTodo(state, { todo, text = todo.text, done = todo.done }) {
    const index = state.todos.indexOf(todo);
    state.todos.splice(index, 1, { ...todo, text, done });
  }
};
