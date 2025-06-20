export interface Message {
  id: number;
  content: string;
  createdAt: string;
  author?: {
    id: number;
    name: string;
    email?: string;
  };
}