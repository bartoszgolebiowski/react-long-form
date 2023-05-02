import React, { useState } from "react";

type WizardProps = {
  children: React.ReactNode;
  initialStep?: number;
};

function Wizard(props: React.PropsWithChildren<WizardProps>) {
  const { children, initialStep = 0 } = props;
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (index !== currentStep) {
          return null;
        }
        return child;
      })}
      <button type="button" onClick={previousStep} disabled={currentStep === 0}>
        Previous
      </button>
      <button
        type="button"
        onClick={nextStep}
        disabled={currentStep === React.Children.count(children) - 1}
      >
        Next
      </button>
    </>
  );
}

export default Wizard;
