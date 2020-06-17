import { ShapeType } from '~/types';
import { Shape } from '~/shape/Shape';

export class ShapeFactory {
  public createShape(shapeType: ShapeType): Shape {
    switch (shapeType) {
      case ShapeType.I:
        return new Shape([
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);
      case ShapeType.J:
        return new Shape([
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2],
        ]);
      case ShapeType.L:
        return new Shape([
          [0, 0, 0],
          [3, 3, 3],
          [3, 0, 0],
        ]);
      case ShapeType.O:
        return new Shape([
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0, 0, 0],
        ]);
      case ShapeType.S:
        return new Shape([
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0],
        ]);
      case ShapeType.T:
        return new Shape([
          [0, 0, 0],
          [6, 6, 6],
          [0, 6, 0],
        ]);
      case ShapeType.Z:
        return new Shape([
          [0, 0, 0],
          [7, 7, 0],
          [0, 7, 7],
        ]);
    }
  }
}
