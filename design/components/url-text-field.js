import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import useDebouncedCallback from "../utils/use-debounced-callback";

const UrlTextField = ({
  id,
  className,
  label,
  readOnly,
  value,
  onChange,
  debouceTimeout = 500,
}) => {
  const [link, setLink] = useState(value);
  useEffect(() => {
    setLink(value);
  }, [value]);

  const [isValidForm, setIsValidForm] = useState(true);
  const debouncedSaveChanges = useDebouncedCallback(onChange, debouceTimeout);

  const isValidUrl = (value) => {
    const isValid = value === "" || value.startsWith("http");
    setIsValidForm(isValid);
    return isValid;
  };

  const handleLinkChange = (e) => {
    const { value } = e.target;

    setLink(value);
    if (isValidUrl(value)) {
      debouncedSaveChanges(value);
    }
  };

  return (
    <TextField
      id={id}
      label={label}
      required
      value={link}
      disabled={readOnly}
      error={!isValidForm}
      helperText={isValidForm ? "" : "Invalid URL"}
      className={className}
      onChange={handleLinkChange}
    />
  );
};

UrlTextField.PropTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  debouceTimeout: PropTypes.number,
};
export default UrlTextField;
