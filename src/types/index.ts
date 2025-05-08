export interface Board {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  userId: string;
}

export interface Column {
  id: string;
  boardId: string;
  name: string;
  order: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Card {
  id: string;
  columnId: string;
  title: string;
  description: string;
  order: number;
  tags: Tag[];
  createdAt: string;
}