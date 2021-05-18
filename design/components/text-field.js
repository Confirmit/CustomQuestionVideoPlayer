import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import useDebouncedCallback from "../utils/use-debounced-callback";

const TextFieldWithDebounce = ({
  id,
  className,
  label,
  required,
  readOnly,
  error,
  helperText,
  value,
  onChange,
  debouceTimeout = 500,
}) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedSaveChanges = useDebouncedCallback(onChange, debouceTimeout);

  const handleChange = (e) => {
    const { value } = e.target;

    setInputValue(value);
    debouncedSaveChanges(value);
  };

  return (
    <TextField
      id={id}
      name={id}
      label={label}
      required={required}
      disabled={readOnly}
      error={error}
      helperText={helperText}
      value={inputValue}
      className={className}
      onChange={handleChange}
    />
  );
};

TextFieldWithDebounce.PropTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  debouceTimeout: PropTypes.number,
};

export default TextFieldWithDebounce;
