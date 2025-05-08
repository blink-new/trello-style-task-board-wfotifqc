import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { Column } from './Column';
import { Board, Card as CardType, Column as ColumnType } from '../../types';
import { Button } from '../ui/button';

interface BoardViewProps {
  board: Board;
  columns: ColumnType[];
  cards: Record<string, CardType[]>;
  onCardClick: (card: CardType) => void;
  onAddCard: (columnId: string) => void;
  onAddColumn: () => void;
  onDragEnd: (result: DropResult) => void;
}

export function BoardView({
  board,
  columns,
  cards,
  onCardClick,
  onAddCard,
  onAddColumn,
  onDragEnd,
}: BoardViewProps) {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{board.name}</h1>
        {board.description && (
          <p className="text-gray-600 mt-1">{board.description}</p>
        )}
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-[calc(100vh-200px)]">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={cards[column.id] || []}
              onCardClick={onCardClick}
              onAddCard={onAddCard}
            />
          ))}
          
          <div className="flex-shrink-0 w-72">
            <Button
              variant="outline"
              className="border-dashed border-2 h-12 w-full"
              onClick={onAddColumn}
            >
              <Plus className="h-5 w-5 mr-1" />
              Add Column
            </Button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}