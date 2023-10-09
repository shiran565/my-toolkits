import { useState, useEffect } from "react";
import styled from "styled-components";

const STORAGE_KEY = "react-todos";

const Form = ({ addItem }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      addItem(e.target.value);
      e.target.value = "";
    }
  };

  const Container = styled.div`
    width:100%;

    input {
      box-sizing:border-box;

      padding:3px;
      width:100%;
      font-size:16px;

      line-height:20px;
    }
  `;

  return (
    <Container>
      <input
        type="text"
        placeholder="What do you need to do?"
        onKeyUp={handleSubmit.bind(this)}
      />
    </Container>
  );
};

const Item = ({ todo, doneTodo, removeTodo }) => {
  const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;

    &:not(:last-child)) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    input {
      margin-right:10px;
    }
  `;

  return (
    <ListItem>
      <input
        className="todo-item-checkbox"
        type="checkbox"
        checked={todo.done}
        onChange={() => doneTodo(todo.text)}
      />
      <span className="todo-item-text">{todo.text}</span>
      <button
        className="toto-item-delete"
        onClick={() => removeTodo(todo.text)}
      >
        X
      </button>
    </ListItem>
  );
};

export default function Todos() {
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  let [todos, setTodos] = useState(storage);

  const addItem = (text) => {
    setTodos((todos) => [...todos, { text, done: false }]);
  };

  const doneTodo = (text) => {
    const updatedTodos = todos.map((todo) => {
      return text === todo.text ? { ...todo, done: !todo.done } : todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (text) => {
    const updatedTodos = todos.filter((todo) => todo.text !== text);
    setTodos(updatedTodos);
  };

  //通过effect hook监听todos的变化
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const Container = styled.div`
    width: 600px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
    @media (max-width: 800px) {
      width: 100%;
    }

    h2 {
      text-align: center;
    }
  `;

  return (
    <Container>
      <h2 className="component-title">My Todo List</h2>
      <Form addItem={addItem.bind(this)} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <Item
            key={todo.text}
            todo={todo}
            doneTodo={doneTodo.bind(this)}
            removeTodo={removeTodo.bind(this)}
          />
        ))}
      </ul>
    </Container>
  );
}
