import { ElementProps, Elements, ConcreteElements, Position, Size, ZIndex, Color } from '..'

interface TextProps extends ElementProps {
  content: string
  textColor: Color
  fontSize: number
}

interface Typography extends Elements {
  getContent(): string
  setContent(content: string): void

  getTextColor(): Color
  setTextColor(color: Color): void

  getFontSize(): number
  setFontSize(fontSize: number): void
}

// Concrete Interface for Text
interface TextFactory {
  createText(props: TextProps): Typography
}

export class TextConcreteFactory implements TextFactory {
  createText({ position, size, zIndex, content, textColor, fontSize }: TextProps): Typography {
    return new ConcreteText(position, size, zIndex, content, textColor, fontSize)
  }
}

class ConcreteText extends ConcreteElements implements Typography {
  constructor(
    position: Position,
    size: Size,
    zIndex: ZIndex,
    private content: string,
    private textColor: Color,
    private fontSize: number
  ) {
    super(position, size, zIndex)
  }

  getTextColor(): Color {
    return this.textColor
  }
  setTextColor(color: Color): void {
    this.textColor = color
  }

  getContent(): string {
    return this.content
  }

  setContent(content: string): void {
    this.content = content
  }

  getFontSize(): number {
    return this.fontSize
  }

  setFontSize(fontSize: number): void {
    this.fontSize = fontSize
  }
}
