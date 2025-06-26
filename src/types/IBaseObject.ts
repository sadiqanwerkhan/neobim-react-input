export interface BaseObjectEvents {
  parametersChanged: (changedParameterNames: string[]) => void;
}

export interface IBaseObject {
  parameters: Record<string, string>;
  on<U extends keyof BaseObjectEvents>(
    event: U,
    listener: BaseObjectEvents[U]
  ): this;
  setParameters(newValues: Record<string, string>): void;
}
