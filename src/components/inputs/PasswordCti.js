import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const PasswordCti = ({
  value,
  sx,
  updateFunction,
  adornmentText,
  adornmentIcon,
  adornmentPosition,
  id,
  readOnly,
  size,
  label,
  tooltipText,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      sx={sx}
      value={value}
      type={showPassword ? "text" : "password"}
      size={size === "" ? "medium" : size}
      onChange={(e) => updateFunction(e.target.value)}
      error={error}
      helperText={helperText}
      InputProps={{
        readOnly: readOnly,
        startAdornment: (
          <Tooltip sx={{ mr: 1 }} title={tooltipText} arrow>
            <InputAdornment
              position={
                adornmentPosition === null ? "start" : adornmentPosition
              }
            >
              {adornmentIcon}
              {adornmentText === "" ? null : adornmentText}
            </InputAdornment>
          </Tooltip>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? (
                <VisibilityRoundedIcon />
              ) : (
                <VisibilityOffRoundedIcon />
              )}
            </IconButton>
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

export default PasswordCti;
