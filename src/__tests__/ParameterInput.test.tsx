/// <reference types="vitest" />
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ParameterInput from "../components/ParameterInput";
import type { IBaseObject } from "../types/IBaseObject";
import { describe, expect, it } from "vitest";

function createMockObject(initial: string): IBaseObject {
  let parameters = { radius: initial };
  let listener: ((changed: string[]) => void) | null = null;

  return {
    get parameters() {
      return parameters;
    },
    on(event, cb) {
      if (event === "parametersChanged") listener = cb;
      return this;
    },
    setParameters(newValues) {
      parameters = { ...parameters, ...newValues };
      listener?.(Object.keys(newValues));
    },
  };
}

describe("ParameterInput", () => {
  it("shows single value for one object", () => {
    const obj = createMockObject("10");
    const { getByDisplayValue } = render(
      <ParameterInput parameterName="radius" selectedObjects={[obj]} />
    );
    expect(getByDisplayValue("10")).toBeInTheDocument();
  });

  it("shows ***varies*** for multiple objects with different values", () => {
    const obj1 = createMockObject("10");
    const obj2 = createMockObject("20");
    const { getByPlaceholderText } = render(
      <ParameterInput parameterName="radius" selectedObjects={[obj1, obj2]} />
    );
    expect(getByPlaceholderText("***varies***")).toBeInTheDocument();
  });

  it("updates all selected objects on input change", () => {
    const obj1 = createMockObject("10");
    const obj2 = createMockObject("10");
    const { getByDisplayValue } = render(
      <ParameterInput parameterName="radius" selectedObjects={[obj1, obj2]} />
    );

    const input = getByDisplayValue("10") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "15" } });

    expect(obj1.parameters.radius).toBe("15");
    expect(obj2.parameters.radius).toBe("15");
  });

  it("reacts to external parametersChanged events", () => {
    const obj = createMockObject("10");
    const { getByDisplayValue, rerender } = render(
      <ParameterInput parameterName="radius" selectedObjects={[obj]} />
    );

    obj.setParameters({ radius: "50" });

    rerender(<ParameterInput parameterName="radius" selectedObjects={[obj]} />);
    expect(getByDisplayValue("50")).toBeInTheDocument();
  });
});
