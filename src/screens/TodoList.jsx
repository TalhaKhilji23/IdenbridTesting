import React, { useState, useEffect } from "react";
import { BsTrash3, BsPencil, BsWindowPlus } from "react-icons/bs"; // Import the icons
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { useNavigate } from 'react-router-dom';
import { createTodo, updateTodo, deleteTodo, changeNameOfTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import { StorageImage } from '@aws-amplify/ui-react-storage';

function TodoList() {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [file, setFile] = useState(null);
  const [picKey, setPicKey] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const result = await API.graphql({
          ...graphqlOperation(listTodos, { input: item }),
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        setTodos(result.data.listTodos.items);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    };

    fetchTodos();
  }, [item]);

  const uploadImage = async () => {
    if (!file) {
      console.log("No file selected");
      return null;
    }
    try {
      const result = await Storage.put(file.name, file, {
        contentType: file.type,
      });
      console.log("File uploaded successfully", result.key);
      return result.key;
    } catch (error) {
      console.log("Error uploading file: ", error);
      return null;
    }
  };

  const handleAddItem = async (event) => {
    event.preventDefault();

    try {
      const user = await Auth.currentAuthenticatedUser();
      let imageKey = picKey;

      if (file) {
        imageKey = await uploadImage();
      }

      if (editIndex !== null) {
        console.log("1111111")
        const todo = { ...todos[editIndex], name: item, img: imageKey };
        console.log("xzxzc",todo);  
        const result = await API.graphql({
          ...graphqlOperation(updateTodo, {input :{ id: todo.id, name: todo.name , img: todo.img  }}),
          authMode: "AMAZON_COGNITO_USER_POOLS"
        });
        
        console.log("Updated todo", result)
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = todo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        const todo = { name: item, img: imageKey };
        const result = await API.graphql({
          ...graphqlOperation(createTodo, { input: todo }),
          authMode: "AMAZON_COGNITO_USER_POOLS"
        });
        setTodos([...todos, result.data.createTodo]);
      }
      setItem("");
      setFile(null); // Clear the file input after adding/updating
      setPicKey(null); // Clear the picKey after adding/updating
    } catch (error) {
      console.error("Error adding/updating todo", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const todo = todos[index];

      console.log("Node to be deleted", todo);
      await API.graphql({
        ...graphqlOperation(deleteTodo, { input: { id: todo.id } }),
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
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

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
   
    <main className="flex-grow container mx-auto p-4 grid  grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex-grow items-center justify-center mt-40">
      <img
        src="https://t3.ftcdn.net/jpg/05/13/59/72/360_F_513597277_YYqrogAmgRR9ohwTUnOM784zS9eYUcSk.jpg"
        alt="Image 1"
        className="w-full h-[80%] object-cover rounded-md"
      />
    </div>
    <div className="min-h-screen flex items-center justify-center flex-1 order-2 md:order-1">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Todo List</h2>
          <form className="space-y-4" onSubmit={handleAddItem}>
            <div>
              <label htmlFor="item" className="block text-sm font-medium text-gray-700">
                Enter Item
              </label>
              <div className="flex">
                <input
                  id="item"
                  name="item"
                  type="text"
                  onChange={(e) => setItem(e.target.value)}
                  value={item}
                  required
                  className="w-full h-10 mt-1 border pl-3 border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor="file-input"
                  className="cursor-pointer w-52 mt-1 ml-3 h-10 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                  Select Image
                </label>
              </div>
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
          <div className="overflow-y-auto h-96">
            <ul className="space-y-2">
              {todos.map((todo, index) => (
                <li key={index} className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded">
                  <StorageImage className="w-32 h-20 rounded-md" imgKey={todo.img || 'UserAvatar.png'} />
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
      </div>
  </main>
  );
}

export default TodoList;
