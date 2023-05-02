import React from "react";
import useCountRerender from "./useCountRereder";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function TextField(props: TextFieldProps) {
  const { id, label, name, value, onChange, error, ...rest } = props;
  const rerender = useCountRerender();

  return (
    <div>
      <span>Renders: {rerender}</span>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-describedby={`${id}-error`}
        {...rest}
      />
      {error && (
        <span style={{ color: "red" }} id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default TextField