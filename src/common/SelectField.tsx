import React from "react";
import useCountRerender from "./useCountRereder";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
};

function SelectField(props: SelectFieldProps) {
  const { id, label, name, value, onChange, error, children, ...rest } = props;
  const rerender = useCountRerender();

  return (
    <div>
      <span>Renders: {rerender}</span>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-describedby={`${id}-error`}
        disabled={React.Children.count(children) === 0}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <span style={{ color: "red" }} id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default SelectField
