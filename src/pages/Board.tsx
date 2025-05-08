import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import { Header } from '../components/layout/Header';
import { BoardView } from '../components/board/BoardView';
import { CardModal } from '../components/modals/CardModal';
import { ColumnModal } from '../components/modals/ColumnModal';
import { 
  mockTags, 
  getBoardById, 
  getColumnsByBoardId, 
  getCardsByColumnId 
} from '../data/mock-data';
import { Board as BoardType, Card, Column } from '../types';

export function Board() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [board, setBoard] = useState<BoardType | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [cards, setCards] = useState<Record<string, Card[]>>({});
  
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const boardData = getBoardById(id);
    if (!boardData) {
      navigate('/');
      return;
    }
    
    setBoard(boardData);
    
    const columnsData = getColumnsByBoardId(id);
    setColumns(columnsData);
    
    const cardsData: Record<string, Card[]> = {};
    columnsData.forEach(column => {
      cardsData[column.id] = getCardsByColumnId(column.id);
    });
    setCards(cardsData);
  }, [id, navigate]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Find the card that was dragged
    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;
    
    if (sourceColumn === destinationColumn) {
      // Reordering within the same column
      const columnCards = [...cards[sourceColumn]];
      const [movedCard] = columnCards.splice(source.index, 1);
      columnCards.splice(destination.index, 0, movedCard);
      
      // Update the order property
      const updatedCards = columnCards.map((card, index) => ({
        ...card,
        order: index,
      }));
      
      setCards({
        ...cards,
        [sourceColumn]: updatedCards,
      });
    } else {
      // Moving from one column to another
      const sourceCards = [...cards[sourceColumn]];
      const destinationCards = [...cards[destinationColumn]];
      
      // Remove from source column
      const [movedCard] = sourceCards.splice(source.index, 1);
      
      // Add to destination column
      const updatedCard = {
        ...movedCard,
        columnId: destinationColumn,
      };
      
      destinationCards.splice(destination.index, 0, updatedCard);
      
      // Update order properties
      const updatedSourceCards = sourceCards.map((card, index) => ({
        ...card,
        order: index,
      }));
      
      const updatedDestinationCards = destinationCards.map((card, index) => ({
        ...card,
        order: index,
      }));
      
      setCards({
        ...cards,
        [sourceColumn]: updatedSourceCards,
        [destinationColumn]: updatedDestinationCards,
      });
    }
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsCardModalOpen(true);
  };

  const handleAddCard = (columnId: string) => {
    setSelectedCard(null);
    setActiveColumnId(columnId);
    setIsCardModalOpen(true);
  };

  const handleSaveCard = (cardData: Partial<Card>) => {
    if (selectedCard) {
      // Edit existing card
      const updatedCards = cards[selectedCard.columnId].map(card => 
        card.id === selectedCard.id 
          ? { ...card, ...cardData } 
          : card
      );
      
      setCards({
        ...cards,
        [selectedCard.columnId]: updatedCards,
      });
    } else if (activeColumnId) {
      // Create new card
      const columnCards = cards[activeColumnId] || [];
      const newCard: Card = {
        id: `card-${Date.now()}`,
        columnId: activeColumnId,
        title: cardData.title || 'New Card',
        description: cardData.description || '',
        order: columnCards.length,
        tags: cardData.tags || [],
        createdAt: new Date().toISOString(),
      };
      
      setCards({
        ...cards,
        [activeColumnId]: [...columnCards, newCard],
      });
    }
  };

  const handleAddColumn = () => {
    setIsColumnModalOpen(true);
  };

  const handleSaveColumn = (name: string) => {
    if (!board) return;
    
    const newColumn: Column = {
      id: `column-${Date.now()}`,
      boardId: board.id,
      name,
      order: columns.length,
    };
    
    setColumns([...columns, newColumn]);
    setCards({
      ...cards,
      [newColumn.id]: [],
    });
  };

  if (!board) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <BoardView
        board={board}
        columns={columns}
        cards={cards}
        onCardClick={handleCardClick}
        onAddCard={handleAddCard}
        onAddColumn={handleAddColumn}
        onDragEnd={handleDragEnd}
      />
      
      <CardModal
        card={selectedCard}
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setSelectedCard(null);
          setActiveColumnId(null);
        }}
        onSave={handleSaveCard}
        availableTags={mockTags}
      />
      
      <ColumnModal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        onSave={handleSaveColumn}
      />
    </div>
  );
}