export interface IShape {
  x: number;
  y: number;
  color: string;
  rotate: (param?: { clockwise: boolean }) => void;
  move: ({ x, y }: { x?: number; y?: number }) => void;
}

export enum ShapeType {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z',
}
