export class Shape {
  public x: number = 0;
  public y: number = 0;
  color: string = 'red';

  constructor(public blocks: number[][]) {}

  public move({ x = this.x, y = this.y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  public rotate() {
    const blocks = this.blocks;
    const temp: number[][] = blocks.map((row) => new Array(row.length).fill(0));
    console.log('temp', JSON.parse(JSON.stringify(temp)));

    blocks.forEach((xRow, y) => {
      xRow.forEach((_val, x) => {
        temp[x][y] = blocks[xRow.length - 1 - y][x];
      });
    });

    this.blocks = temp;
  }
}
