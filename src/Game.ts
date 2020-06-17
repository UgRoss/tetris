import { ShapeFactory } from './shape/ShapeFactory';
import { ShapeType, IShape } from './types';

export class Game {
  static points = {
    '1': 40,
    '2': 100,
    '3': 300,
    '4': 1200
  };
  public field: any[][];
  public activePiece: IShape;
  public nextPiece: IShape;
  public score = 0;
  public lines = 0;
  private shapeFactory: ShapeFactory = new ShapeFactory();

  get level(): number {
    return Math.floor(this.lines * 0.1);
  }

  constructor() {
    this.field = this.createPlayField();
    this.activePiece = this.createPiece();
    this.nextPiece = this.createPiece();
  }

  getState() {
    const field = JSON.parse(JSON.stringify(this.field));
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          field[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }

    return {
      field,
    };
  }

  /** Creates empty play field */
  private createPlayField = (): number[][] =>
    Array.from({ length: 20 }, () => new Array(10).fill(0));

  /** Creates random piece */
  private createPiece(): IShape {
    const values = Object.keys(ShapeType);
    const randomShapeType = values[Math.floor(Math.random() * values.length)];
    const shape = this.shapeFactory.createShape(ShapeType[randomShapeType as ShapeType]);
    // Center the shape in field
    shape.x = Math.floor((10 - shape.blocks[0].length) / 2);
    shape.y = -1;

    return shape;
  }

  movePieceLeft() {
    this.activePiece.move({ x: this.activePiece.x - 1 });

    /** If piece is outside of the field, revert the changes */
    if (this.hasCollision) {
      this.activePiece.move({ x: this.activePiece.x + 1 });
    }
  }

  movePieceRight() {
    this.activePiece.move({ x: this.activePiece.x + 1 });

    /** If piece is outside of the field, revert the changes */
    if (this.hasCollision) {
      this.activePiece.move({ x: this.activePiece.x - 1 });
    }
  }

  movePieceDown() {
    this.activePiece.move({ y: this.activePiece.y + 1 });

    /** If piece is outside of the field, revert the changes */
    if (this.hasCollision) {
      this.activePiece.move({ y: this.activePiece.y - 1 });
      this.lockPiece();
      const clearedLines = this.clearLines();
      this.updateScore(clearedLines);
      this.updatePieces();
    }
  }

  rotatePiece() {
    this.activePiece.rotate();
    return this.activePiece;
  }

  get hasCollision() {
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          (this.field[pieceY + y] === undefined ||
            this.field[pieceY + y][pieceX + x] === undefined ||
            this.field[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  lockPiece() {
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;
    // 0 | 0 | [[1,2,3], [], []]

    // 1. this.field[0][0] = blocks[0, 0]; -> 0
    // 2. this.field[0][1] = blocks[0, 1]; -> 1
    // 3. this.field[0][2] = blocks[0, 2];

    // 1. this.field[1][0] = blocks[1, 0];
    // 2. this.field[1][1] = blocks[1, 1];
    // 3. this.field[1][2] = blocks[1, 2];

    // 1. this.field[2][0] = blocks[2, 0];
    // 2. this.field[2][1] = blocks[2, 1];
    // 3. this.field[2][2] = blocks[2, 2];

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.field[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }

  private clearLines() {
    const rows = 20;
    const columns = 10;
    const lines = [];

    for (let y = rows - 1; y >= 0; y--) {
      let numberOfBlocks = 0;
      for (let x = 0; x < columns; x++) {
        if(this.field[y][x]) {
          numberOfBlocks += 1;
        }
      }

      if (numberOfBlocks === 0) {
        // exit because above anyway we will not find blocks to clear
        break;
      } else if(numberOfBlocks < columns) {
        continue;
      } else if(numberOfBlocks === columns) {
        lines.unshift(y);
      }
    }

    for(let index of lines) {
      // TODO: avoid mutation + if mutation avoid for loop above can now not start from the end (probably)
      this.field.splice(index, 1);
      this.field.unshift(new Array(10).fill(0));
    }

    return lines.length;
  }

  updateScore(clearedLines: number) {
    if(clearedLines > 0) {
      console.log(this.level);
      this.score += Game.points[clearedLines] * (this.level + 1);
      this.lines += clearedLines;
      console.log(this.score, this.lines, this.level);
    }
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}

export default Game;
