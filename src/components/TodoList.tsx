import type { Filter, Todo } from '@/types/todo';
import { TodoItem } from '@/components/TodoItem';

type TodoListProps = {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const emptyMessage: Record<Filter, string> = {
  all: 'Nothing here yet — add your first todo above.',
  active: 'No active todos. Nice work!',
  completed: 'No completed todos yet.',
};

export function TodoList({ todos, filter, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="px-6 py-14 text-center">
        <p className="text-sm text-slate-400">{emptyMessage[filter]}</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
