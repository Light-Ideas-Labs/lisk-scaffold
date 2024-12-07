"use client";

import { useState } from "react";
import { Text } from "../components/ui/text"; // Assuming you have a `Text` component in `ui`
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setInputValue("");
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <Text.H1>Hello web3Clubs!</Text.H1>

      <Text.P>
        If you&apos;re running Hardhat locally, you should see some data below:
      </Text.P>

      <Text.H2 className="mt-8">To-Do List</Text.H2>
      <div className="flex items-center gap-2 mt-4">
        <Input
          type="text"
          placeholder="Add a new to-do"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={addTodo}>
          Add
        </Button>
      </div>

      {todos.length === 0 && (
        <Text.P className="mt-4">No to-dos yet. Add one above!</Text.P>
      )}

      <ul className="mt-6 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`p-4 border rounded-lg flex justify-between items-center ${
              todo.completed ? "bg-gray-100 line-through" : ""
            }`}
          >
            <span>{todo.text}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleTodoCompletion(todo.id)}
            >
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
