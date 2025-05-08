import { Draggable } from 'react-beautiful-dnd';
import { Card as CardType } from '../../types';
import { cn } from '../../lib/utils';

interface CardProps {
  card: CardType;
  index: number;
  onClick: (card: CardType) => void;
  columnColor?: string;
}

export function Card({ card, index, onClick, columnColor = '#e2e8f0' }: CardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'bg-white rounded-md shadow-sm p-3 mb-2 cursor-pointer border-l-4 hover:shadow-md transition-shadow',
            snapshot.isDragging ? 'shadow-md' : ''
          )}
          style={{
            ...provided.draggableProps.style,
            borderLeftColor: columnColor,
          }}
          onClick={() => onClick(card)}
        >
          <h3 className="font-medium text-gray-900 mb-1">{card.title}</h3>
          
          {card.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{card.description}</p>
          )}
          
          {card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {card.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${tag.color}20`, // 20% opacity
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}