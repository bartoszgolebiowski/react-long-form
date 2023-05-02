import React from "react";
import { AllSections, DynamicField } from "../formConfig";
import DynamicInputsField from "./DynamicInputsField";
import SelectField from "./SelectField";
import TextField from "./TextField";

type SectionProps = {
  section: AllSections;
  values: {
    "text-name-1": string;
    "text-name-2": string;
    "select-name-3": string;
    "select-name-4": string;
    "dynamic-name-5": DynamicField[];
  };
  errors: {
    "text-name-1": string;
    "text-name-2": string;
    "select-name-3": string;
    "select-name-4": string;
    "dynamic-name-5": string;
  };
  selectOptions: {
    "select-name-3": React.ReactNode;
    "select-name-4": React.ReactNode;
  };
  onChangeDynamic: (value: DynamicField[]) => void;
  onChangeInputSelect: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

function SectionDebounce(props: SectionProps) {
  const {
    section,
    values,
    errors,
    selectOptions,
    onChangeDynamic,
    onChangeInputSelect,
  } = props;

  const first = `${section}-text-name-1`;
  const second = `${section}-text-name-2`;
  const third = `${section}-select-name-3`;
  const fourth = `${section}-select-name-4`;
  const fifth = `${section}-dynamic-name-5`;

  return (
    <div>
      <h2>{section}</h2>
      <TextField
        label={first}
        name={first}
        id={first}
        error={errors["text-name-1"]}
        onChange={onChangeInputSelect}
      />
      <TextField
        label={second}
        name={second}
        id={second}
        error={errors["text-name-2"]}
        onChange={onChangeInputSelect}
      />
      <SelectField
        label={third}
        name={third}
        id={third}
        error={errors["select-name-3"]}
        onChange={onChangeInputSelect}
      >
        {selectOptions["select-name-3"]}
      </SelectField>
      <SelectField
        label={fourth}
        name={fourth}
        id={fourth}
        error={errors["select-name-4"]}
        onChange={onChangeInputSelect}
      >
        {selectOptions["select-name-4"]}
      </SelectField>
      <DynamicInputsField
        description="Add more fields"
        id={fifth}
        label={fifth}
        name={fifth}
        value={values["dynamic-name-5"]}
        error={errors["dynamic-name-5"]}
        onChange={onChangeDynamic}
      />
    </div>
  );
}

export default SectionDebounce;
