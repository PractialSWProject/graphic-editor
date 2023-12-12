type RerenderMethod = () => void

export interface Observer {
  update(): void
  setRerenderMethod(componentRerenderMethod: RerenderMethod): void
}

export class LayerObserver implements Observer {
  private static instance: LayerObserver | null = null
  private rerenderMethod: RerenderMethod | null = null

  private constructor() {}

  public static getInstance(): LayerObserver {
    if (!LayerObserver.instance) {
      LayerObserver.instance = new LayerObserver()
    }
    return LayerObserver.instance
  }

  public setRerenderMethod(componentRerenderMethod: RerenderMethod): void {
    this.rerenderMethod = componentRerenderMethod
  }

  public update(): void {
    if (this.rerenderMethod) {
      this.rerenderMethod()
    }
  }
}

export class EditorObserver implements Observer {
  private static instance: EditorObserver | null = null
  private rerenderMethod: RerenderMethod | null = null

  private constructor() {}

  public static getInstance(): EditorObserver {
    if (!EditorObserver.instance) {
      EditorObserver.instance = new EditorObserver()
    }
    return EditorObserver.instance
  }

  public setRerenderMethod(componentRerenderMethod: RerenderMethod): void {
    this.rerenderMethod = componentRerenderMethod
  }

  public update(): void {
    if (this.rerenderMethod) {
      this.rerenderMethod()
    }
  }
}

export class PropertyWindowObserver implements Observer {
  private static instance: PropertyWindowObserver | null = null
  private rerenderMethod: RerenderMethod | null = null

  private constructor() {}

  public static getInstance(): PropertyWindowObserver {
    if (!PropertyWindowObserver.instance) {
        PropertyWindowObserver.instance = new PropertyWindowObserver()
    }
    return PropertyWindowObserver.instance
  }

  public setRerenderMethod(componentRerenderMethod: RerenderMethod): void {
    this.rerenderMethod = componentRerenderMethod
  }

  public update(): void {
    if (this.rerenderMethod) {
      this.rerenderMethod()
    }
  }
}
