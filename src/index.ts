import { Game } from './Game';

const game = new Game();
(window as any).game = game;

console.log('Hello');
