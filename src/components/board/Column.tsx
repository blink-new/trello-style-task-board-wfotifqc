import { Droppable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { Card } from './Card';
import { Card as CardType, Column as ColumnType } from '../../types';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

// Column color mapping
const columnColors: Record<string, string> = {
  'To Do': '#3182CE', // Blue
  'In Progress': '#DD6B20', // Orange
  'Review': '#805AD5', // Purple
  'Done': '#38A169', // Green
  'Backlog': '#718096', // Gray
  'Completed': '#38A169', // Green
  'Planning': '#3182CE', // Blue
  'Design': '#805AD5', // Purple
  'Development': '#DD6B20', // Orange
  'Testing': '#D69E2E', // Yellow
  'Deployed': '#38A169', // Green
};

// Default color if column name is not in the mapping
const defaultColor = '#718096';

interface ColumnProps {
  column: ColumnType;
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  onAddCard: (columnId: string) => void;
}

export function Column({ column, cards, onCardClick, onAddCard }: ColumnProps) {
  const columnColor = columnColors[column.name] || defaultColor;
  
  return (
    <div className="bg-gray-50 rounded-md shadow-sm w-72 flex-shrink-0">
      <div 
        className="p-2 font-medium flex items-center justify-between border-b"
        style={{ borderColor: `${columnColor}40` }} // 40% opacity
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: columnColor }}
          />
          <h3>{column.name}</h3>
          <span className="text-xs text-gray-500 font-normal">
            {cards.length}
          </span>
        </div>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'p-2 min-h-[200px]',
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            )}
          >
            {cards.map((card, index) => (
              <Card 
                key={card.id} 
                card={card} 
                index={index} 
                onClick={onCardClick}
                columnColor={columnColor}
              />
            ))}
            {provided.placeholder}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-gray-500 hover:text-gray-700 justify-start"
              onClick={() => onAddCard(column.id)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add a card
            </Button>
          </div>
        )}
      </Droppable>
    </div>
  );
}