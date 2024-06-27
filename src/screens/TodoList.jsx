import React, { useState, useEffect } from "react";
import { BsTrash3, BsPencil, BsWindowPlus } from "react-icons/bs"; // Import the icons
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useNavigate } from 'react-router-dom';

import { createTodo, updateTodo, deleteTodo ,changeNameOfTodo} from '../graphql/mutations';

import { listTodos } from '../graphql/queries';

function TodoList() {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const result = await API.graphql({
          ...graphqlOperation(listTodos, { input: item }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        console.log("Result of todo>", result)
        setTodos(result.data.listTodos.items);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddItem = async (event) => {
    event.preventDefault();

    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("User",user)
      if (editIndex !== null) {
        const todo = { ...todos[editIndex], name: item };
        console.log("Todo To be updated>>",todo)
        const updatedVlue = await API.graphql(graphqlOperation(changeNameOfTodo,{ id: todo.id, name: todo.name }),);
        // const updatedVlue = await API.graphql(graphqlOperation(updateTodo, { input: { id: todo.id } }));
        console.log("Updated Value>>>>",updatedVlue)
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = todo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Add item
        const todo = { name: item };
        console.log("Addition of todo Value>> ",todo)
        const result = await API.graphql({
          ...graphqlOperation(createTodo, { input: todo }),
          authMode:  "AMAZON_COGNITO_USER_POOLS"
        });
        setTodos([...todos, result.data.createTodo]);
      }
      setItem("");
    } catch (error) {
      console.error("Error adding/updating todo", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const todo = todos[index];

      console.log("Node to be deleted", todo)
      const result = await API.graphql({
        ...graphqlOperation(deleteTodo, { input: { id: todo.id } }),
        authMode:  "AMAZON_COGNITO_USER_POOLS"
      });
      // await API.graphql(graphqlOperation(deleteTodo, { input: { id: todo.id } }));
      const filteredTodos = todos.filter((_, i) => i !== index);
      setTodos(filteredTodos);
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const handleEdit = (index) => {
    setItem(todos[index].name);
    setEditIndex(index);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Todo List</h2>
        <form className="space-y-4" onSubmit={handleAddItem}>
          <div>
            <label htmlFor="item" className="block text-sm font-medium text-gray-700">
              Enter Item
            </label>
            <input
              id="item"
              name="item"
              type="text"
              onChange={(e) => setItem(e.target.value)}
              value={item}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-4/5 px-4 py-2 font-medium text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editIndex !== null ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>

        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded">
              <span>{todo.name}</span>
              <div className="flex items-center space-x-2">
                <BsWindowPlus
                  onClick={() => handleEdit(index)}
                  className="w-5 h-5 text-blue-500 mr-3 cursor-pointer hover:text-blue-700"
                />
                <BsTrash3
                  onClick={() => handleDelete(index)}
                  className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
