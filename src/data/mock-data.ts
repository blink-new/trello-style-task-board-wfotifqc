import { Board, Card, Column, Tag } from '../types';

// Mock Tags
export const mockTags: Tag[] = [
  { id: '1', name: 'Bug', color: '#E53E3E' },
  { id: '2', name: 'Feature', color: '#38A169' },
  { id: '3', name: 'Enhancement', color: '#3182CE' },
  { id: '4', name: 'Documentation', color: '#805AD5' },
  { id: '5', name: 'Design', color: '#DD6B20' },
  { id: '6', name: 'High Priority', color: '#E53E3E' },
  { id: '7', name: 'Low Priority', color: '#718096' },
];

// Mock Boards
export const mockBoards: Board[] = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'Main development project for Q3',
    createdAt: '2023-06-15T10:00:00Z',
    userId: 'user1',
  },
  {
    id: '2',
    name: 'Marketing Campaign',
    description: 'Q4 marketing initiatives',
    createdAt: '2023-07-20T14:30:00Z',
    userId: 'user1',
  },
  {
    id: '3',
    name: 'Website Redesign',
    description: 'Revamp of company website',
    createdAt: '2023-08-05T09:15:00Z',
    userId: 'user1',
  },
];

// Mock Columns
export const mockColumns: Column[] = [
  { id: '1', boardId: '1', name: 'To Do', order: 0 },
  { id: '2', boardId: '1', name: 'In Progress', order: 1 },
  { id: '3', boardId: '1', name: 'Review', order: 2 },
  { id: '4', boardId: '1', name: 'Done', order: 3 },
  { id: '5', boardId: '2', name: 'Backlog', order: 0 },
  { id: '6', boardId: '2', name: 'In Progress', order: 1 },
  { id: '7', boardId: '2', name: 'Completed', order: 2 },
  { id: '8', boardId: '3', name: 'Planning', order: 0 },
  { id: '9', boardId: '3', name: 'Design', order: 1 },
  { id: '10', boardId: '3', name: 'Development', order: 2 },
  { id: '11', boardId: '3', name: 'Testing', order: 3 },
  { id: '12', boardId: '3', name: 'Deployed', order: 4 },
];

// Mock Cards
export const mockCards: Card[] = [
  {
    id: '1',
    columnId: '1',
    title: 'Setup development environment',
    description: 'Install and configure all necessary tools and dependencies',
    order: 0,
    tags: [mockTags[1], mockTags[6]],
    createdAt: '2023-06-16T08:30:00Z',
  },
  {
    id: '2',
    columnId: '1',
    title: 'Create database schema',
    description: 'Design and implement initial database structure',
    order: 1,
    tags: [mockTags[1], mockTags[4]],
    createdAt: '2023-06-16T09:45:00Z',
  },
  {
    id: '3',
    columnId: '2',
    title: 'Implement user authentication',
    description: 'Add login, registration, and password reset functionality',
    order: 0,
    tags: [mockTags[1], mockTags[5]],
    createdAt: '2023-06-17T11:20:00Z',
  },
  {
    id: '4',
    columnId: '3',
    title: 'Review API endpoints',
    description: 'Check all API endpoints for security and performance',
    order: 0,
    tags: [mockTags[2], mockTags[6]],
    createdAt: '2023-06-18T14:10:00Z',
  },
  {
    id: '5',
    columnId: '4',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    order: 0,
    tags: [mockTags[2], mockTags[3]],
    createdAt: '2023-06-19T10:30:00Z',
  },
  {
    id: '6',
    columnId: '5',
    title: 'Research target audience',
    description: 'Analyze demographics and interests of potential customers',
    order: 0,
    tags: [mockTags[4], mockTags[6]],
    createdAt: '2023-07-21T09:00:00Z',
  },
  {
    id: '7',
    columnId: '6',
    title: 'Create social media content',
    description: 'Design and schedule posts for all platforms',
    order: 0,
    tags: [mockTags[4], mockTags[5]],
    createdAt: '2023-07-22T13:45:00Z',
  },
  {
    id: '8',
    columnId: '8',
    title: 'Gather requirements',
    description: 'Interview stakeholders and document needs',
    order: 0,
    tags: [mockTags[3], mockTags[6]],
    createdAt: '2023-08-06T08:20:00Z',
  },
  {
    id: '9',
    columnId: '9',
    title: 'Create wireframes',
    description: 'Design initial layout and user flow',
    order: 0,
    tags: [mockTags[4], mockTags[5]],
    createdAt: '2023-08-07T11:30:00Z',
  },
  {
    id: '10',
    columnId: '9',
    title: 'Design color scheme',
    description: 'Select brand-appropriate colors for the new site',
    order: 1,
    tags: [mockTags[4], mockTags[6]],
    createdAt: '2023-08-07T14:15:00Z',
  },
];

// Helper function to get columns by board ID
export const getColumnsByBoardId = (boardId: string): Column[] => {
  return mockColumns.filter(column => column.boardId === boardId)
    .sort((a, b) => a.order - b.order);
};

// Helper function to get cards by column ID
export const getCardsByColumnId = (columnId: string): Card[] => {
  return mockCards.filter(card => card.columnId === columnId)
    .sort((a, b) => a.order - b.order);
};

// Helper function to get a board by ID
export const getBoardById = (boardId: string): Board | undefined => {
  return mockBoards.find(board => board.id === boardId);
};