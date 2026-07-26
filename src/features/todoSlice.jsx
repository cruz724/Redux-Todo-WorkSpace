import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadInitialTodos = () => {
  try {
    const saved = localStorage.getItem("todos");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading todos from localStorage:", error);
  }
  return [
    { id: "1", text: "Welcome to your Redux Todo App!", completed: false, createdAt: new Date().toISOString() },
    { id: "2", text: "Hello World", completed: true, createdAt: new Date().toISOString() }
  ];
};

const initialState = {
  todos: loadInitialTodos(),
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.todos.push(action.payload);
      },
      // Prepare callback
      prepare: (text) => {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
