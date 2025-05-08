import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  onNewBoard?: () => void;
}

export function Header({ onNewBoard }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <img src="/logo.png" alt="TaskBoard Logo" className="h-8 w-8 rounded" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
          <span>TaskBoard</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {onNewBoard && (
            <Button onClick={onNewBoard} size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              <span>New Board</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}