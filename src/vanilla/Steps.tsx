import { useState } from "react";
import {
  AllSections,
  DynamicField,
  initialValues,
  validation,
} from "../formConfig";
import useSelect from "../common/useFetchSelect";
import TextField from "../common/TextField";
import SelectFieldOption from "../common/SelectFieldOption";
import Section from "../common/Section";
import Wizard from "../common/wizard/Wizard";
import Step from "../common/wizard/Step";

function Steps() {
  const [formData, setFormData] = useState(initialValues);
  const selectOptions = useSelect(formData);
  const errors = validation(formData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  const handleFormChangeInputAndSelect = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormChangeDynamicInputs =
    (name: keyof typeof formData) => (value: DynamicField[]) => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const toggleSection = () => {
    const checkbox = formData["section-5-additional"];
    setFormData((prevData) => ({
      ...prevData,
      "section-5-additional": !checkbox,
      "section-5-text-name-1": "",
      "section-5-text-name-2": "",
      "section-5-select-name-3": "",
      "section-5-select-name-4": "",
      "section-5-dynamic-name-5": [],
    }));
  };

  const isValid = Object.values(errors).every((error) => error === "");

  const createValues = (section: AllSections) => ({
    "text-name-1": formData[`${section}-text-name-1`],
    "text-name-2": formData[`${section}-text-name-2`],
    "select-name-3": formData[`${section}-select-name-3`],
    "select-name-4": formData[`${section}-select-name-4`],
    "dynamic-name-5": formData[`${section}-dynamic-name-5`],
  });

  const createErrors = (section: AllSections) => ({
    "text-name-1": errors[`${section}-text-name-1`],
    "text-name-2": errors[`${section}-text-name-2`],
    "select-name-3": errors[`${section}-select-name-3`],
    "select-name-4": errors[`${section}-select-name-4`],
    "dynamic-name-5": errors[`${section}-dynamic-name-5`],
  });

  const createSelectOptions = (section: AllSections) => ({
    "select-name-3": selectOptions[`${section}-select-name-3`].data?.map(
      (option) => (
        <SelectFieldOption key={option.id} value={option.id}>
          {option.value}
        </SelectFieldOption>
      )
    ),
    "select-name-4": selectOptions[`${section}-select-name-4`].data?.map(
      (option) => (
        <SelectFieldOption key={option.id} value={option.id}>
          {option.value}
        </SelectFieldOption>
      )
    ),
  });

  return (
    <div>
      <h1>Wizard</h1>
      <form onSubmit={handleSubmit}>
        <Wizard>
          <Step>
            <Section
              section="section-1"
              values={createValues("section-1")}
              errors={createErrors("section-1")}
              selectOptions={createSelectOptions("section-1")}
              onChangeInputSelect={handleFormChangeInputAndSelect}
              onChangeDynamic={handleFormChangeDynamicInputs(
                "section-1-dynamic-name-5"
              )}
            />
          </Step>
          <Step>
            <Section
              section="section-2"
              values={createValues("section-2")}
              errors={createErrors("section-2")}
              selectOptions={createSelectOptions("section-2")}
              onChangeInputSelect={handleFormChangeInputAndSelect}
              onChangeDynamic={handleFormChangeDynamicInputs(
                "section-2-dynamic-name-5"
              )}
            />
          </Step>
          <Step>
            <Section
              section="section-3"
              values={createValues("section-3")}
              errors={createErrors("section-3")}
              selectOptions={createSelectOptions("section-3")}
              onChangeInputSelect={handleFormChangeInputAndSelect}
              onChangeDynamic={handleFormChangeDynamicInputs(
                "section-3-dynamic-name-5"
              )}
            />
          </Step>
          <Step>
            <Section
              section="section-4"
              values={createValues("section-4")}
              errors={createErrors("section-4")}
              selectOptions={createSelectOptions("section-4")}
              onChangeInputSelect={handleFormChangeInputAndSelect}
              onChangeDynamic={handleFormChangeDynamicInputs(
                "section-4-dynamic-name-5"
              )}
            />
          </Step>
          <Step>
            <div>
              <TextField
                id="section-5-additional"
                label="Toggle Section"
                name="section-5-additional"
                checked={formData["section-5-additional"] ? true : undefined}
                onChange={toggleSection}
                type="checkbox"
                error={errors["section-5-additional"]}
              />
              {formData["section-5-additional"] === true ? (
                <Section
                  section="section-5"
                  values={createValues("section-5")}
                  errors={createErrors("section-5")}
                  selectOptions={createSelectOptions("section-5")}
                  onChangeInputSelect={handleFormChangeInputAndSelect}
                  onChangeDynamic={handleFormChangeDynamicInputs(
                    "section-5-dynamic-name-5"
                  )}
                />
              ) : null}
            </div>
          </Step>
        </Wizard>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Steps;
