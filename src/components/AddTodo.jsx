import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';

const AddTodo = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    dispatch(addTodo(trimmedInput));
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg text-sm transition-colors cursor-pointer"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTodo;