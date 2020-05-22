export interface IShape {
  color: string;
  shape: number[][];
  rotate: () => void;
  move: ({ x, y }: { x: number; y: number }) => void;
}

export enum ShapeType {
  I,
  J,
  L,
  O,
  S,
  T,
  Z,
}
