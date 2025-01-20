import React, { useState, useEffect } from "react";
import axios from "axios";


const apiUrl = process.env.REACT_APP_API_URL; 

console.log("Process Env:", process.env);
console.log("API URL:", apiUrl);

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const fetchTasks = async () => {
    axios
    .get(`${apiUrl}/api/todo`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Response data:", response.data);
      setTasks(response.data);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
  };

  const addTask = async () => {
    if (taskName.trim()) {
      axios.post(`${apiUrl}/api/todo`, { Name: taskName, IsComplete: false }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        console.log("Response data:", response.data);
        setTaskName("");
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`${apiUrl}/api/todo/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}{" "}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
