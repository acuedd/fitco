export type Channel = {
  id: number;
  name: string;
  isPrivate: boolean;
  members: any[]; // ajusta según tu modelo
  workspace: {
    id: number;
    name: string;
  };
};