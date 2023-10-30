import { ConcreteElements, ElementProps, Elements, Position, Size, ZIndex } from '..'

interface ImageProps extends ElementProps {
  imageUrl: string
}

export interface Image extends Elements {
  getImageUrl(): string
  setImageUrl(url: string): void
}

// Concrete interface for Image Factory
interface ImageFactory {
  createImage(props: ImageProps): Image
}

export class ImageConcreteFactory implements ImageFactory {
  createImage({ position, size, zIndex, selected, imageUrl }: ImageProps): Image {
    return new ConcreteImage(position, size, zIndex, selected, imageUrl)
  }
}

class ConcreteImage extends ConcreteElements implements Image {
  constructor(
    position: Position,
    size: Size,
    zIndex: ZIndex,
    selected: boolean,
    private imageUrl: string
  ) {
    super(position, size, zIndex, selected)
  }

  getImageUrl(): string {
    return this.imageUrl
  }

  setImageUrl(url: string): void {
    this.imageUrl = url
  }
}
