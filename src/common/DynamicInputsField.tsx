import React from "react";
import { DynamicField } from "../formConfig";
import useCountRerender from "./useCountRereder";

type DynamicInputFieldsProps = {
  id: string;
  name: string;
  label: string;
  description: string;
  error?: string;
  value: DynamicField[];
  onChange: (value: DynamicField[]) => void;
};

type DynamicInputElement = DynamicField;

function DynamicInputsField(props: DynamicInputFieldsProps) {
  const { id, label, description, error, value, onChange } = props;
  const [createValue, setCreateValue] = React.useState("");
  const rerender = useCountRerender();

  const labelledBy = `dynamic-inputs-label-${id}`;
  const describedBy = `dynamic-inputs-description-${id}`;
  const errorId = `${id}-error`;
  const createNameId = `dynamic-inputs-create-name-${id}`;
  const createNameDatalistId = `${createNameId}-datalist`;

  const resetInput = () => {
    setCreateValue("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateValue(event.target.value ?? "");
  };

  const handleAddInput = () => {
    const newInputId = generateRandomId();
    const newInputName = createValue;
    const newInput = { id: newInputId, value: newInputName };
    if (isDynamicInputElement(newInput)) {
      onChange([...value, newInput]);
      resetInput();
      return;
    }

    throw new Error("Invalid input");
  };

  const handleRemoveInput = (id: string) => () => {
    const updatedInputs = value.filter((input) => input.id !== id);
    onChange(updatedInputs);
  };

  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      <span>Renders: {rerender}</span>
      <label id={labelledBy}>{label}</label>
      <p id={describedBy}>{description}</p>
      <label htmlFor={createNameId}>Name</label>
      <input
        type="text"
        value={createValue}
        onChange={handleChange}
        id={createNameId}
        name={createNameId}
        list={createNameDatalistId}
        aria-describedby={errorId}
      />
      <datalist id={createNameDatalistId}>
        {hints.map((hint) => (
          <option key={hint} value={hint} />
        ))}
      </datalist>
      <button type="button" onClick={handleAddInput}>
        Add
      </button>
      {value.map((input) => (
        <div key={input.id}>
          <input
            type="text"
            id={input.id}
            name={input.id}
            disabled
            defaultValue={input.value}
          />
          <button type="button" onClick={handleRemoveInput(input.id)}>
            Remove
          </button>
        </div>
      ))}
      {error && (
        <span style={{ color: "red" }} id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}

// creat typeguard to check if the input is a DynamicInputElement
const isDynamicInputElement = (input: any): input is DynamicInputElement => {
  return input && input.id && input.value;
};

// do not use Math.radnom() use crypto instead
const generateRandomId = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  const randomValues = self.crypto.getRandomValues(new Uint32Array(1));
  if (!randomValues.length) {
    throw new Error("Unable to generate random values");
  }
  return randomValues[0].toString();
};

const hints = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
  "Black",
  "White",
  "Brown",
  "Pink",
  "Gray",
];

export default DynamicInputsField;
