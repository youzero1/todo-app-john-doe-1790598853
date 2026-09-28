import { useMemo, useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import type { Filter } from '@/types/todo';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { TodoFooter } from '@/components/TodoFooter';

export function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Todos
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Stay on top of your day — saved right in your browser.
          </p>
        </header>

        <section className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <TodoInput onAdd={addTodo} />
          </div>

          <TodoList
            todos={visible}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          <TodoFooter
            filter={filter}
            onFilterChange={setFilter}
            remaining={remaining}
            hasCompleted={hasCompleted}
            onClearCompleted={clearCompleted}
          />
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          Double-click a todo to edit it.
        </p>
      </div>
    </main>
  );
}
