import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";

const TextfieldCti = ({
  value,
  sx,
  updateFunction,
  adornmentStartText,
  adornmentStartIcon,
  adornmentStartPosition,
  adornmentEndPosition,
  adornmentEndIcon,
  adornmentEndText,
  adornmentEndFunction,
  id,
  readOnly,
  size,
  type,
  label,
  tooltipText,
  error,
  helperText,
}) => {
  return (
    <TextField
      sx={sx}
      value={value}
      error={error}
      helperText={helperText}
      type={type === "" ? "text" : type}
      size={size === "" ? "medium" : size}
      onChange={(e) => updateFunction(e.target.value)}
      InputProps={{
        readOnly: readOnly,
        startAdornment: (
          <Tooltip sx={{ mr: 1 }} title={tooltipText === undefined ? "" : tooltipText} arrow>
            <InputAdornment
              position={
                adornmentStartPosition === null
                  ? "start"
                  : adornmentStartPosition
              }
            >
              {adornmentStartIcon}
              {adornmentStartText === "" ? null : adornmentStartText}
            </InputAdornment>
          </Tooltip>
        ),
        endAdornment: (
            <InputAdornment
              position={
                adornmentEndPosition === null
                  ? "start"
                  : adornmentEndPosition
              }
            >
              {adornmentEndIcon}
              {adornmentEndText === "" ? null : adornmentEndText}
            </InputAdornment>
        ),
      }}
      fullWidth
      label={label}
      id={id}
      variant="outlined"
    />
  );
};

export default TextfieldCti;
