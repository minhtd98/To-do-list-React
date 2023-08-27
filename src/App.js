import { useState } from "react";
import "./App.css";

function TodoItem({ value,onEdit,onDelete, index }) {
  const [edit, setEdit] = useState(false);
  const [editInput , setEditInput] = useState(() => value)

  const handleEdit = () => {
    setEdit(true);
  };

  const hanleCancel=()=>{
    setEdit(false)
  }

  const onSubmit=()=>{
    onEdit(editInput,index)
    setEdit(false)
  }

  const handleDelete=()=>{
    onDelete(index)

  }
  return (
    <>
      <h1>{value}</h1>
      {!edit ? (
        <div>
          <button onClick={handleEdit}>edit</button>
          <button onClick={handleDelete}>delete</button>
        </div>
      ) : (
        <div>
          <input type="text" defaultValue={value} value={editInput} onChange={e=>setEditInput(e.target.value) } />
          <button onClick={hanleCancel}>cancel</button>
          <button onClick={onSubmit}>save</button>
        </div>
      )}
    </>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  console.log(todos);

  function handleSubmit() {
    if (todo) {
      setTodos([todo, ...todos]);
    } else {
      alert("to do is null");
    }
  }

  function handleDelete(index) {
    console.log(index);
    const newArr = [...todos];
    newArr.splice(index, 1);
    setTodos(newArr);
  }

  
  const handleEdit = (value,index)=>{
    const newArr = todos.map((todo,i)=>{
      if(i===index){
        return value
      }
      return todo
    })
     setTodos(newArr)
  }

  return (
    <div className="App">
      <input
        style={{ padding: 20 }}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="add to do list"
      />
      <button style={{ padding: 20 }} onClick={handleSubmit}>
        ADD
      </button>
      <ul>
        {todos.map((todo, index) => (
          <div>
            <TodoItem value={todo} key={index}index={index} onEdit={handleEdit} onDelete={handleDelete}/>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
