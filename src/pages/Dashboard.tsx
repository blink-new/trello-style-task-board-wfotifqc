import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { BoardList } from '../components/dashboard/BoardList';
import { BoardModal } from '../components/modals/BoardModal';
import { mockBoards } from '../data/mock-data';
import { Board } from '../types';

export function Dashboard() {
  const [boards, setBoards] = useState<Board[]>(mockBoards);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const handleCreateBoard = (boardData: { name: string; description: string }) => {
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: boardData.name,
      description: boardData.description,
      createdAt: new Date().toISOString(),
      userId: 'user1',
    };
    
    setBoards([newBoard, ...boards]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewBoard={() => setIsBoardModalOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Boards</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your projects
          </p>
        </div>
        
        <BoardList boards={boards} />
      </main>
      
      <BoardModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        onSave={handleCreateBoard}
      />
    </div>
  );
}