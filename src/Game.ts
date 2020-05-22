import { ShapeFactory } from './shape/ShapeFactory';
import { ShapeType } from './types';

export class Game {
  score = 0;
  lines = 0;
  level = 0;
  field = Array.from({ length: 20 }, () => new Array(10).fill(0));
  private shapeFactory: ShapeFactory = new ShapeFactory();

  constructor() {
    // this.field[10][0] = 1;
    // this.field[9][1] = 1;
    // this.field[10][1] = 1;
    // this.field[10][2] = 1;
  }

  activePiece = this.createPiece();

  nextPiece = this.createPiece();

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

  createPlayField() {
    const field: any[] = [];

    for (let y = 0; y < 20; y++) {
      field[y] = [];

      for (let x = 0; x < 10; x++) {
        field[y][x] = 0;
      }
    }

    return field;
  }

  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = ShapeType[index];
    const piece = { x: 0, y: 0 };
    console.log(type);

    return this.shapeFactory.createShape(ShapeType[type]);
  }

  movePieceLeft() {
    this.activePiece.x -= 1;

    /** If piece is outside of the field, revert the changes */
    if (this.hasCollision) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    /** If piece is outside of the field, revert the changes */
    if (this.hasCollision) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    /** If piece is outside of the field, revert the changes */
    if (this.hasCollision) {
      this.activePiece.y -= 1;
      this.lockPiece();
      this.updatePieces();
    }
  }

  rotatePiece() {
    this.activePiece.rotate();
    // this.activePiece.rotationIndex = (this.activePiece.rotationIndex + 1) % 4;
    // console.log(this.hasCollision);
    // if (this.hasCollision) {
    //   this.activePiece.rotationIndex =
    //     this.activePiece.rotationIndex > 0 ? this.activePiece.rotationIndex - 1 : 3;
    // }

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
        console.log(blocks[y][x]);
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
