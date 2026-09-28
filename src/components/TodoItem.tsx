import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function startEditing() {
    setDraft(todo.text);
    setEditing(true);
  }

  function commit() {
    setEditing(false);
    if (draft.trim() !== todo.text) onEdit(todo.id, draft);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') {
      setDraft(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50 sm:px-5">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={todo.completed ? `Mark "${todo.text}" as active` : `Mark "${todo.text}" as done`}
        className="size-5 shrink-0 cursor-pointer rounded-md border-slate-300 accent-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
      />

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          aria-label="Edit todo"
          className="min-w-0 flex-1 rounded-lg border border-indigo-300 bg-white px-2 py-1 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        />
      ) : (
        <span
          onDoubleClick={startEditing}
          className={
            todo.completed
              ? 'min-w-0 flex-1 cursor-text break-words text-slate-400 line-through'
              : 'min-w-0 flex-1 cursor-text break-words text-slate-800'
          }
        >
          {todo.text}
        </span>
      )}

      {!editing && (
        <button
          type="button"
          onClick={startEditing}
          aria-label={`Edit "${todo.text}"`}
          title="Edit"
          className="shrink-0 rounded-lg p-1.5 text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 group-hover:opacity-100"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.5 8.5A2 2 0 016.5 15.5l-3 .5.5-3a2 2 0 01.586-1.414l8.5-8.5z" />
          </svg>
        </button>
      )}

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
        title="Delete"
        className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M8.75 1.5a1.25 1.25 0 00-1.25 1.25V3.5H4a.75.75 0 000 1.5h.62l.66 10.06A2.25 2.25 0 007.53 17h4.94a2.25 2.25 0 002.25-1.94L15.38 5H16a.75.75 0 000-1.5h-3.5v-.75A1.25 1.25 0 0011.25 1.5h-2.5zM9 3.5h2v-.5H9v.5zm-.75 4a.75.75 0 011.5 0v5a.75.75 0 01-1.5 0v-5zm3.5-.75a.75.75 0 00-.75.75v5a.75.75 0 001.5 0v-5a.75.75 0 00-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  );
}
