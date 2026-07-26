import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("todos", JSON.stringify(state.todo.todos));
  } catch (error) {
    console.error("Could not save state to localStorage:", error);
  }
});