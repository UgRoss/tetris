import { Game } from './Game';
import { View } from './View';

const root = document.querySelector('#root') as HTMLElement;

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

(window as any).game = game;
(window as any).view = view;

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37: // LEFT
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 38: // UP
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 39: // Right
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 40: //down
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
});

view.render(game.getState());
console.log('Hello');
