type SelectFieldOptionProps = React.OptionHTMLAttributes<HTMLOptionElement>;

function SelectFieldOption(props: SelectFieldOptionProps) {
  return <option {...props} />;
}

export default SelectFieldOption;
