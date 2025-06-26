import React, { useEffect, useState } from "react";
import type { IBaseObject } from "../types/IBaseObject";

interface Props {
  parameterName: string;
  selectedObjects: IBaseObject[];
}

const ParameterInput: React.FC<Props> = ({
  parameterName,
  selectedObjects,
}) => {
  const [value, setValue] = useState("");
  const [isVaried, setIsVaried] = useState(false);

  // Sync UI with selected objects
  useEffect(() => {
    if (selectedObjects.length === 0) {
      setValue("");
      setIsVaried(false);
      return;
    }

    const values = selectedObjects.map((obj) => obj.parameters[parameterName]);
    const uniqueValues = Array.from(new Set(values));

    if (uniqueValues.length === 1) {
      setValue(uniqueValues[0]);
      setIsVaried(false);
    } else {
      setValue("***varies***");
      setIsVaried(true);
    }

    const listeners: (() => void)[] = [];

    selectedObjects.forEach((obj) => {
      const handler = (changed: string[]) => {
        if (changed.includes(parameterName)) {
          const newValues = selectedObjects.map(
            (o) => o.parameters[parameterName]
          );
          const unique = Array.from(new Set(newValues));
          setIsVaried(unique.length > 1);
          setValue(unique.length === 1 ? unique[0] : "***varies***");
        }
      };

      obj.on("parametersChanged", handler);
      listeners.push(() => obj.on("parametersChanged", () => {}));
    });

    return () => {
      listeners.forEach((unsub) => unsub());
    };
  }, [parameterName, selectedObjects]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsVaried(false);

    selectedObjects.forEach((obj) => {
      obj.setParameters({ [parameterName]: newValue });
    });
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={isVaried ? "***varies***" : ""}
      style={{ padding: "8px", fontSize: "14px", width: "100%" }}
    />
  );
};

export default ParameterInput;
