export class Game {
  score = 0;
  lines = 0;
  level = 0;
  field = Array.from({ length: 20 }, () => new Array(10).fill(0));

  constructor() {
    this.field[10][0] = 1;
    this.field[10][1] = 1;
  }

  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  };

  movePieceLeft() {
    this.activePiece.x -= 1;

    /** If piece is outside of the field, revert the changes */
    if (this.isPieceOutOfBounds) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    /** If piece is outside of the field, revert the changes */
    if (this.isPieceOutOfBounds) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    /** If piece is outside of the field, revert the changes */
    if (this.isPieceOutOfBounds) {
      this.activePiece.y -= 1;
      this.lockPiece();
    }
  }

  get isPieceOutOfBounds() {
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
}

export default Game;
