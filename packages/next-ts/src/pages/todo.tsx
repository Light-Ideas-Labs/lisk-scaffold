"use client";

import { useState } from "react";
import { Text } from "../components/ui/text"; // Ensure you have this component
import { Button } from "../components/ui/button"; // Ensure you have this component
import { Input } from "../components/ui/input"; // Ensure you have this component

import { useContracts } from "../blockchain/hooks/useContractsProvider";

type Todo = {
  text: string;
  completed: boolean;
};

function useTestContractReads(): [ReadonlyArray<Todo> | null, () => Promise<void>] {
  const contracts = useContracts();
  const todoList = contracts.TodoList()
  const [todos, setTodos] = useState<ReadonlyArray<Todo> | null>(null);

  const fetchTodos = async () => {
    try {
      const { data } =  todoList.getAll.useRead();
      console.log("todo what!!", data)
      setTodos(data || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setTodos(null);
    }
  };

  return [todos, fetchTodos];
}

function useTestContractWrites() {
  const contracts = useContracts();
  const todoList = contracts.TodoList();

  return async (text: string) => {
    try {
      const { data } = todoList.add.useSimulateContract({ args: [text] });
      if (data?.request) {
        // await todoList.add.writeContract(data.request);
        // console.log("Todo added successfully:", text);
      }
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };
}

export default function TodoPage() {
  const [todos, fetchTodos] = useTestContractReads();
  const addTodo = useTestContractWrites();
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = async () => {
    if (!newTodo) return;
    await addTodo(newTodo);
    setNewTodo("");
    await fetchTodos();
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <Text.H1>Todo List DApp</Text.H1>

      <Text.P>
        This is a decentralized to-do list built with Hardhat, Next.js, and Wagmi.
      </Text.P>

      <Text.H2 className="mt-8">Your Todos</Text.H2>
      <ul className="list-disc mt-4">
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <li key={index} className="flex items-center space-x-4">
              <span>{todo.text}</span>
              <span className={todo.completed ? "text-green-500" : "text-gray-500"}>
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </li>
          ))
        ) : (
          <Text.P>No todos available. Add a new one!</Text.P>
        )}
      </ul>

      <div className="mt-8">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="w-full mb-4"
        />
        <Button onClick={handleAdd} className="w-full">
          Add Todo
        </Button>
      </div>
    </div>
  );
}
