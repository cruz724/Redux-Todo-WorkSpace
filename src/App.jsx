import React from 'react';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased">
      <div className="max-w-2xl mx-auto w-full px-4 py-12 flex-1 flex flex-col gap-8">


        <header className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-neutral-50">
            RTK Todo <span className="text-indigo-500 font-normal">Workspace</span>
          </h1>
          <p className="text-xs text-neutral-500">
            A minimalist task manager demonstrating state management with Redux Toolkit.
          </p>
        </header>


        <main className="flex-1 space-y-6">
          <AddTodo />
          <Todo />
        </main>

        <footer className="text-center pt-8 border-t border-neutral-900">
          <p className="text-xs text-neutral-500 font-medium tracking-wide">
            Shubham Redux ToDo
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;