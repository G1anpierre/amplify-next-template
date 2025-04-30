"use client";

import { useEffect, useState } from "react";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getTodos, createTodo, deleteTodo } from "./actions/getData";

Amplify.configure(outputs);

// Define the Todo type to match what's returned from the server action
interface Todo {
  id: string;
  content: string | null;
  owner: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoContent, setNewTodoContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user, signOut } = useAuthenticator();

  // Fetch todos on page load
  useEffect(() => {
    async function loadTodos() {
      setIsLoading(true);
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Failed to load todos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadTodos();
  }, []);

  // Handle todo creation
  async function handleCreateTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodoContent.trim()) return;
    
    try {
      const newTodo = await createTodo(newTodoContent);
      if (newTodo) {
        setTodos((current) => [...current, newTodo as Todo]);
        setNewTodoContent("");
      }
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  }

  // Handle todo deletion
  async function handleDeleteTodo(id: string) {
    try {
      await deleteTodo(id);
      setTodos((current) => current.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      
      <form onSubmit={handleCreateTodo} className="todo-form">
        <input
          type="text"
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="add-button">Add Todo</button>
      </form>
      
      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        <ul className="todo-list">
          {todos.length === 0 ? (
            <p>No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <span>{todo.content}</span>
                <button 
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      )}
      
      <button onClick={signOut} className="sign-out-button">Sign out</button>
    </main>
  );
}
