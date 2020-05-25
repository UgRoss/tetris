import { ShapeFactory } from './shape/ShapeFactory';
import { ShapeType, IShape } from './types';

export class Game {
  public field: any[][];
  public activePiece: IShape;
  public nextPiece: IShape;
  public score = 0;
  public lines = 0;
  public level = 0;
  private shapeFactory: ShapeFactory = new ShapeFactory();

  constructor() {
    this.field = this.createPlayField();
    this.activePiece = this.createPiece();
    this.nextPiece = this.createPiece();
  }

  getState() {
    const field = this.createPlayField();
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;

    for (let y = 0; y < this.field.length; y++) {
      field[y] = [];

      for (let x = 0; x < this.field[y].length; x++) {
        field[y][x] = this.field[y][x];
      }
    }

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

    return this.shapeFactory.createShape(ShapeType[randomShapeType as ShapeType]);
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

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}

export default Game;
