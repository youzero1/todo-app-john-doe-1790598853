import type { Filter } from '@/types/todo';

type TodoFooterProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  remaining: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
};

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFooter({
  filter,
  onFilterChange,
  remaining,
  hasCompleted,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <p className="text-xs text-slate-500">
        {remaining} {remaining === 1 ? 'item' : 'items'} left
      </p>

      <div
        role="tablist"
        aria-label="Filter todos"
        className="flex items-center gap-1 rounded-xl bg-slate-200/70 p-1"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => onFilterChange(f.value)}
            className={
              filter === f.value
                ? 'rounded-lg bg-white px-3 py-1 text-xs font-medium text-indigo-600 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-200'
                : 'rounded-lg px-3 py-1 text-xs font-medium text-slate-500 transition hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-200'
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="sm:min-w-[7.5rem] sm:text-right">
        {hasCompleted && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
