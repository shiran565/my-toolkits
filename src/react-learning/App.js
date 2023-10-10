import "./global.css"
import Todos from "./components/Todos";

export default function App() {
  return (
    <div className="app">
      <h1 className="title">React demos</h1>
      <br />
      <Todos />
    </div>
  );
}
