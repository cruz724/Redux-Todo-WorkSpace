import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, updateTodo } from '../features/todoSlice';

const Todo = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  // filtering and searching
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // inline editing
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Filter & search logic
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()));

  // edit handlers
  const handleStartEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    const trimmedText = editText.trim();
    if (trimmedText) {
      dispatch(updateTodo({ id, text: trimmedText }));
      setEditId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="flex-1 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />

        <div className="flex bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg">
          {['all', 'active', 'completed'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all cursor-pointer ${filter === type
                  ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-neutral-850 rounded-xl">
            <p className="text-sm text-neutral-500">
              {search ? 'No tasks match your search.' : 'No tasks here.'}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3.5 bg-neutral-900 border rounded-xl transition-all duration-200 ${todo.completed ? 'border-neutral-850 opacity-70' : 'border-neutral-800 hover:border-neutral-750'
                }`}
            >
              {editId === todo.id ? (

                <div className="flex-1 flex gap-2 mr-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-xs text-neutral-100 focus:outline-none focus:border-indigo-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(todo.id);
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                  />
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-350 rounded text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">

                  <button
                    onClick={() => dispatch(toggleTodo(todo.id))}
                    className="flex-shrink-0 cursor-pointer"
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${todo.completed
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-neutral-700 hover:border-indigo-500'
                        }`}
                    >
                      {todo.completed && (
                        <svg className="w-2.5 h-2.5 stroke-2 stroke-current fill-none" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </button>

                  <span
                    className={`text-sm select-none break-words ${todo.completed ? 'line-through text-neutral-500' : 'text-neutral-200'
                      }`}
                  >
                    {todo.text}
                  </span>
                </div>
              )}

              {editId !== todo.id && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(todo.id, todo.text)}
                    disabled={todo.completed}
                    className="p-1.5 text-neutral-400 hover:text-neutral-250 hover:bg-neutral-800 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                    title="Edit task"
                  >
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="p-1.5 text-neutral-400 hover:text-rose-500 hover:bg-rose-950/20 rounded-md transition-colors cursor-pointer"
                    title="Delete task"
                  >
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todo;