import { IShape } from '~/types';
export class Shape implements IShape {
  public x: number = 0;
  public y: number = 0;
  public color: string = 'red';

  constructor(public blocks: number[][]) {}

  public move({ x = this.x, y = this.y }) {
    this.x = x;
    this.y = y;
  }

  public rotate({ clockwise = true } = {}) {
    const blocks = this.blocks;
    const temp: number[][] = blocks.map((row) => new Array(row.length).fill(0));

    blocks.forEach((xRow, y) => {
      xRow.forEach((_val, x) => {
        const blockPos = clockwise
          ? blocks[xRow.length - 1 - y][x]
          : blocks[xRow.length - 1 - y][x];
        clockwise ? (temp[x][y] = blockPos) : (temp[y][x] = blockPos);
      });
    });

    this.blocks = temp;
  }
}
