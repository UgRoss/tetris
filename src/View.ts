export class View {
  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private context: CanvasRenderingContext2D = this.canvas.getContext('2d');

  private blockWidth: number;
  private blockHeight: number;

  constructor(
    public element: HTMLElement,
    public width: number,
    public height: number,
    public rows: number,
    public columns: number
  ) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.blockWidth = this.width / columns;
    this.blockHeight = this.height / rows;

    this.element.appendChild(this.canvas);
  }

  public render({ field }: { field: any[] }) {
    this.clearScreen();
    this.renderPlayField(field);
  }

  private clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private renderPlayField(field: any[]) {
    this.context.clearRect(0, 0, this.width, this.height);

    for (let y = 0; y < field.length; y++) {
      const line = field[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block) {
          this.renderBlock(
            x * this.blockWidth,
            y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
            'red'
          );
        }
      }
    }
  }

  private renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}

export default View;
