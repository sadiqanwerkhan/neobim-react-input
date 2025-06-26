import React, { useState } from "react";
import ParameterInput from "./components/ParameterInput";
import type { IBaseObject } from "./types/IBaseObject";

const createMockObject = (initial: string): IBaseObject => {
  let listeners: any = {};
  const obj: IBaseObject = {
    parameters: { radius: initial },
    on(event, cb) {
      listeners[event] = cb;
      return this;
    },
    setParameters(newValues) {
      this.parameters = { ...this.parameters, ...newValues };
      listeners["parametersChanged"]?.(Object.keys(newValues));
    },
  };
  return obj;
};

function App() {
  const [objects] = useState<IBaseObject[]>([
    createMockObject("10"),
    createMockObject("10"),
  ]);

  return (
    <div style={{ padding: 40 }}>
      <h2>NeoBIM Parameter Input Demo</h2>
      <ParameterInput parameterName="radius" selectedObjects={objects} />
    </div>
  );
}

export default App;
