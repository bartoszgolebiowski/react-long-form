import React from "react";
import { AllSections, DynamicField } from "../formConfig";
import DynamicInputsField from "./DynamicInputsField";
import SelectField from "./SelectField";
import TextField from "./TextField";

const DynamicInputsFieldMemo = React.memo(
  DynamicInputsField,
  (prev, next) => prev.value === next.value && prev.error === next.error
);
const SelectFieldMemo = React.memo(
  SelectField,
  (prev, next) =>
    prev.value === next.value &&
    prev.error === next.error &&
    React.Children.count(prev.children) === React.Children.count(next.children)
);
const TextFieldMemo = React.memo(
  TextField,
  (prev, next) => prev.value === next.value && prev.error === next.error
);

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

function SectionMemo(props: SectionProps) {
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
      <TextFieldMemo
        label={first}
        name={first}
        id={first}
        value={values["text-name-1"]}
        error={errors["text-name-1"]}
        onChange={onChangeInputSelect}
      />
      <TextFieldMemo
        label={second}
        name={second}
        id={second}
        value={values["text-name-2"]}
        error={errors["text-name-2"]}
        onChange={onChangeInputSelect}
      />
      <SelectFieldMemo
        label={third}
        name={third}
        id={third}
        value={values["select-name-3"]}
        error={errors["select-name-3"]}
        onChange={onChangeInputSelect}
      >
        {selectOptions["select-name-3"]}
      </SelectFieldMemo>
      <SelectFieldMemo
        label={fourth}
        name={fourth}
        id={fourth}
        value={values["select-name-4"]}
        error={errors["select-name-4"]}
        onChange={onChangeInputSelect}
      >
        {selectOptions["select-name-4"]}
      </SelectFieldMemo>
      <DynamicInputsFieldMemo
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

export default SectionMemo;
