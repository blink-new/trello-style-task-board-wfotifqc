import { Link } from 'react-router-dom';
import { LayoutGrid, Calendar, Clock } from 'lucide-react';
import { Board } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface BoardListProps {
  boards: Board[];
}

export function BoardList({ boards }: BoardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boards.map((board) => (
        <Link
          key={board.id}
          to={`/board/${board.id}`}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">{board.name}</h3>
          </div>
          
          {board.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{board.description}</p>
          )}
          
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(board.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatDistanceToNow(new Date(board.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}